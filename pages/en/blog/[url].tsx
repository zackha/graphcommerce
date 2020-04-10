import { GetStaticProps } from 'next'
import { PageLayoutProps } from '../../../components/PageLayout'
import getStaticPathsFactory from '../../../components/PageLayout/server/getStaticPaths'
import BlogView from '../../blog/[url]'
import extractParams, { StaticPageParams } from '../../../lib/staticParams'

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/en/blog/', 'en')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  const params = extractParams(ctx, '/en/blog/')

  const data = await Promise.all([
    import('../../../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../../../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1] } }
}