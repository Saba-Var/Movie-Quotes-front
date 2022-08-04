import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { Layout } from 'components'

const NewsFeed = () => {
  return (
    <Layout>
      <div className='w-full h-screen bg-gray-600 !block'>News Feed</div>
    </Layout>
  )
}

export default NewsFeed

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['landing', 'common', 'auth'])),
    },
  }
}
