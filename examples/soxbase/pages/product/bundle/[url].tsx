import { Container, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import BundleItemsForm from '@reachdigital/magento-product-bundle/BundleItemsForm'
import {
  ProductBundleDocument,
  ProductBundleQuery,
} from '@reachdigital/magento-product-bundle/ProductBundle.gql'
import {
  ProductPageDocument,
  ProductPageQuery,
} from '@reachdigital/magento-product-types/ProductPage.gql'
import {
  ProductPageAdditionalDocument,
  ProductPageAdditionalQuery,
} from '@reachdigital/magento-product-types/ProductPageAdditional.gql'
import { ProductAddToCartDocument } from '@reachdigital/magento-product/ProductAddToCart/ProductAddToCart.gql'
import productPageCategory from '@reachdigital/magento-product/ProductPageCategory'
import ProductPageDescription from '@reachdigital/magento-product/ProductPageDescription'
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import getProductStaticPaths from '@reachdigital/magento-product/ProductStaticPaths/getProductStaticPaths'
import { ResolveUrlDocument } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import Page from '../../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../../components/Page/PageByUrl.gql'
import ProductListItems from '../../../components/ProductListItems/ProductListItems'
import apolloClient from '../../../lib/apolloClient'

type Props = ProductPageQuery & ProductPageAdditionalQuery & PageByUrlQuery & ProductBundleQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductPage({ products, productAdditionals, bundleProducts, pages }: Props) {
  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const product = products?.items?.[0]
  const bundleProduct = bundleProducts?.items?.[0]

  if (!product) return <NextError statusCode={404} title='Product not found' />

  const category = productPageCategory(product)
  return (
    <>
      <ProductPageMeta {...product} />
      <BottomDrawerUi
        title={product.name ?? ''}
        backFallbackHref={`/${category?.url_path}`}
        backFallbackTitle={category?.name}
      >
        <Container>
          <AddToCartButton
            mutation={ProductAddToCartDocument}
            variables={{ sku: product.sku ?? '', quantity: 1 }}
          />
          <BundleItemsForm {...bundleProduct} />
          <ProductPageDescription {...product} />
          <ProductPageGallery {...product} />
          {pages?.[0] && <Page {...pages?.[0]} />}

          {productAdditionals?.items?.[0]?.upsell_products ? (
            <>
              {/* todo: create a component where we can compose in the ProductListItems */}
              <Typography variant='h2'>Upsells</Typography>
              <ProductListItems items={productAdditionals?.items?.[0]?.upsell_products} />
            </>
          ) : null}
          {productAdditionals?.items?.[0]?.related_products ? (
            <>
              {/* todo: reate a component where we can compose in the ProductListItems */}
              <Typography variant='h2'>Related</Typography>
              <ProductListItems items={productAdditionals?.items?.[0]?.related_products} />
            </>
          ) : null}
        </Container>
      </BottomDrawerUi>
    </>
  )
}

ProductPage.Layout = PageLayout

registerRouteUi('/product/bundle/[url]', BottomDrawerUi)

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales }) => {
  const localePaths =
    locales?.map((locale) => {
      const client = apolloClient(localeToStore(locale))
      return getProductStaticPaths(client, locale, 'BundleProduct')
    }) ?? []
  const paths = (await Promise.all(localePaths)).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const urlKey = params?.url ?? '??'

  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const config = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `product/${urlKey}` },
  })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: { urlKey },
  })
  const bundleProduct = staticClient.query({
    query: ProductBundleDocument,
    variables: { urlKey },
  })
  const productAdditionals = staticClient.query({
    query: ProductPageAdditionalDocument,
    variables: { urlKey },
  })
  const pageLayout = staticClient.query({
    query: PageLayoutDocument,
  })
  const resolveUrl = staticClient.query({
    query: ResolveUrlDocument,
    variables: {
      urlKey: `${urlKey}${(await config)?.data.storeConfig?.product_url_suffix}`,
    },
  })

  return {
    props: {
      ...(await resolveUrl).data,
      ...(await pageLayout).data,
      ...(await productPage).data,
      ...(await page).data,
      ...(await bundleProduct).data,
      ...(await productAdditionals).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}