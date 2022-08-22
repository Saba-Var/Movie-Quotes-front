import InfiniteScroll from 'react-infinite-scroll-component'
import { ScrollPaginationWrapperProps } from './types.d'

const ScrollPaginationWrapper: React.FC<ScrollPaginationWrapperProps> = (
  props
) => {
  const { children, hasMore, next, quoteList } = props

  return (
    <InfiniteScroll
      loader={<h1 className='text-white text-3xl text-center'>Loading...</h1>}
      dataLength={quoteList.length}
      hasMore={hasMore}
      next={next}
    >
      {children}
    </InfiniteScroll>
  )
}

export default ScrollPaginationWrapper
