import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, NewQuote, AllQuotes } from 'components'
import type { GetStaticProps } from 'next'

const NewsFeed = () => {
  return (
    <div className='lg:pl-5 2xl:pl-28'>
      <div className='w-full 1xl:w-[550px] lg:!w-[650px] xl:!w-[800px] 2xl:!w-[990px] h-screen !block lg:pr-[5%] xl:pr-[17%] 2xl:!pr-[350px]'>
        <div className='h-screen w-full pt-5'>
          <NewQuote />

          <AllQuotes />
        </div>
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
