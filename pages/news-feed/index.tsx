import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, NewQuote } from 'components'
import type { GetStaticProps } from 'next'

const NewsFeed = () => {
  return (
    <div className='w-full h-screen bg-background !block lg:pr-[5%] xl:pr-[17%] 2xl:!pr-[350px]'>
      <div className='h-screen w-full pt-5'>
        <NewQuote />
      </div>
    </div>
  )
}

NewsFeed.PageLayout = Layout

export default NewsFeed

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'news-feed',
        'side-menu',
        'landing',
        'common',
        'auth',
      ])),
    },
  }
}
