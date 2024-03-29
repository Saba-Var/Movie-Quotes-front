import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useNewsFeed } from 'hooks'
import Head from 'next/head'
import {
  SearchedPosts,
  AllQuotes,
  SearchBar,
  NewQuote,
  Layout,
} from 'components'

const NewsFeed = () => {
  const { searchedPosts, inputValue, setInputValue, fetchError } = useNewsFeed()

  return (
    <div className='lg:pl-5 2xl:pl-[10%]'>
      <Head>
        <title>News Feed</title>
        <meta
          content='initial-scale=1.0, width=device-width'
          name='viewport'
          key='News Feed'
        />
      </Head>

      <div className='w-full 1xl:w-[550px] lg:!w-[650px] xl:!w-[800px] 2xl:!w-[1100px] h-screen !block lg:pr-[5%] 2xl:!pr-[150px]'>
        <div className='h-screen w-full pt-5'>
          <div className='flex justify-between gap-2 xl:gap-5'>
            <NewQuote />
            <SearchBar setInputValue={setInputValue} inputValue={inputValue} />
          </div>

          {(inputValue.trim()[0] === '@' || inputValue.trim()[0] === '#') &&
          inputValue.length > 1 ? (
            <SearchedPosts
              searchedPosts={searchedPosts}
              fetchError={fetchError}
            />
          ) : (
            <AllQuotes />
          )}
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
