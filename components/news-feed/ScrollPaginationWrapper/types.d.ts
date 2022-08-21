import { Quotes } from 'types'

export type ScrollPaginationWrapperProps = {
  children: JSX.Element
  quoteList: Quotes
  next: () => void
  hasMore: boolean
}
