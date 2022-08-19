import InfiniteScroll from 'react-infinite-scroll-component'
import { useAllQuotes } from './useAllQuotes'

const AllQuotes = () => {
  const { hasMoreQuotes, page, quoteList, setPage } = useAllQuotes()

  return (
    <InfiniteScroll
      next={() => {
        setPage(page + 1)
      }}
      hasMore={hasMoreQuotes}
      dataLength={quoteList.length}
      loader={
        <h1 className='text-white text-3xl text-center'>
          Quotes are loading...
        </h1>
      }
    >
      <>
        {quoteList.map((quote) => {
          return (
            <h1 key={quote._id} className='text-white text-4xl'>
              {quote.quoteEn}
            </h1>
          )
        })}
      </>
    </InfiniteScroll>
  )
}

export default AllQuotes
