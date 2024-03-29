import { ErrorAlert, NewsFeedPost, ScrollPaginationWrapper } from 'components'
import { useAllQuotes } from './useAllQuotes'

const AllQuotes = () => {
  const { hasMoreQuotes, setFetchError, fetchError, quoteList, setPage, page } =
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

      <ScrollPaginationWrapper
        next={() => setPage(page + 1)}
        length={page * 3}
        hasMore={hasMoreQuotes}
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
      </ScrollPaginationWrapper>
    </>
  )
}

export default AllQuotes
