import InfiniteScroll from 'react-infinite-scroll-component'
import { ErrorAlert } from 'components/shared'
import { useAllQuotes } from './useAllQuotes'

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
        <div className='flex flex-col gap-7'>
          {quoteList.map((quote) => {
            return (
              <div key={quote._id} className='flex flex-col gap-7'>
                <h1 key={quote._id} className='text-white text-4xl'>
                  {quote.quoteEn}
                  <p className='text-white text-4xl'>
                    comments {quote.comments.length}
                  </p>
                  <p className='text-white text-4xl'>
                    likes {quote.likes.length}
                  </p>
                </h1>
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default AllQuotes
