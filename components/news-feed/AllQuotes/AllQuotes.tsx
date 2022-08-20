import InfiniteScroll from 'react-infinite-scroll-component'
import { ErrorAlert, NewsFeedPost } from 'components'
import { useAllQuotes } from './useAllQuotes'
import Image from 'next/image'

const AllQuotes = () => {
  const { hasMoreQuotes, page, quoteList, setPage, fetchError, setFetchError } =
    useAllQuotes()

  return (
    <>
      {fetchError && (
        <ErrorAlert
          setShowAlert={setFetchError}
          styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
          title='news-feed:quote-fetch-failed'
        />
      )}

      <InfiniteScroll
        next={() => setPage(page + 1)}
        hasMore={hasMoreQuotes}
        dataLength={quoteList.length}
        loader={
          <h1 className='text-white text-3xl text-center'>
            Quotes are loading...
          </h1>
        }
      >
        <div className='flex flex-col gap-7 overflow-x-hidden mt-[5%]'>
          {quoteList &&
            quoteList.map((quote) => {
              return (
                <div key={quote._id}>
                  <NewsFeedPost quote={quote} />
                </div>
              )
            })}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default AllQuotes
