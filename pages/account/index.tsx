import { Link, NoSsr } from '@material-ui/core'
import SignOutForm from 'components/Customer/SignOutForm'
import useSignedInGuard from 'components/Customer/useSignedInGuard'
import getHeaderProps from 'components/Header/getHeaderProps'
import PageMeta from 'components/PageMeta/PageMeta'
import overlay from 'components/PageTransition/overlay'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { useCustomerQuery } from 'generated/apollo'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps } from 'next'
import React from 'react'

const AccountIndexPage: PageWithShopLayout = () => {
  const signedIn = useSignedInGuard()
  const { data } = useCustomerQuery()

  if (!signedIn) return <div>Not signed in, redirecting...</div>
  return (
    <>
      <PageMeta title='Account' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <NoSsr>
        {data?.customer?.prefix} {data?.customer?.firstname} {data?.customer?.lastname}
        <SignOutForm />
      </NoSsr>
    </>
  )
}

AccountIndexPage.Layout = ShopLayout
AccountIndexPage.pageTransition = overlay

export default AccountIndexPage

export const getStaticProps: GetStaticProps<ShopLayoutProps> = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const navigation = getHeaderProps(staticClient, {
    rootCategory: String((await config).storeConfig?.root_category_id),
  })

  await config
  return {
    props: {
      ...(await navigation),
      apolloState: client.cache.extract(),
    },
  }
}