import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, NewQuote, AllQuotes, SearchBar } from 'components'
import type { GetStaticProps } from 'next'

const NewsFeed = () => {
  return (
    <div className='lg:pl-5 2xl:pl-[10%]'>
      <div className='w-full 1xl:w-[550px] lg:!w-[650px] xl:!w-[800px] 2xl:!w-[1100px] h-screen !block lg:pr-[5%] 2xl:!pr-[150px]'>
        <div className='h-screen w-full pt-5'>
          <div className='flex justify-between gap-2 xl:gap-5'>
            <NewQuote />
            <SearchBar />
          </div>

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
