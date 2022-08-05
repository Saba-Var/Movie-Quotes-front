import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { Layout } from 'components'
import Link from 'next/link'

const NewsFeed = () => {
  return (
    <div className='w-full h-screen bg-gray-600 !block'>
      <Link href={'/en/news-feed/123'}>
        <a>Quote 123</a>
      </Link>
    </div>
  )
}

NewsFeed.PageLayout = Layout

export default NewsFeed

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'side-menu',
        'landing',
        'common',
        'auth',
      ])),
    },
  }
}
