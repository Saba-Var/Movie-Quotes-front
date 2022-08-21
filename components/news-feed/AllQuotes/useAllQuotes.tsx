import { getNewFeedQuotes } from 'services'
import { useEffect, useState } from 'react'
import { Quotes } from 'types'
import {
  useCommentQuote,
  useDislikeQuote,
  useDeleteMovie,
  useDeleteQuote,
  useLikeQuote,
  useEditQuote,
  useSockets,
} from 'hooks'

export const useAllQuotes = () => {
  const [hasMoreQuotes, setHasMoreQuotes] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const [quoteList, setQuoteList] = useState<Quotes>([])

  const [page, setPage] = useState(1)
  const { socket } = useSockets()

  socket
    .off('SEND_NEW_QUOTE_NEWS_FEED')
    .on('SEND_NEW_QUOTE_NEWS_FEED', (quote) => {
      setQuoteList((prev) => [quote, ...prev])
    })

  useCommentQuote(quoteList, setQuoteList)
  useDislikeQuote(quoteList, setQuoteList)
  useDeleteQuote(quoteList, setQuoteList)
  useDeleteMovie(quoteList, setQuoteList)
  useEditQuote(quoteList, setQuoteList)
  useLikeQuote(quoteList, setQuoteList)

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await getNewFeedQuotes(page)

        if (response.status === 200) {
          const { data } = response
          if (data.paginationInfo) {
            const { paginationInfo } = data
            setHasMoreQuotes(paginationInfo.hasMoreQuotes)

            if (page === 1) {
              setQuoteList(data.quotes)
            } else {
              setQuoteList((prev) => [...prev, ...data.quotes])
            }
          }
        }
      } catch (error) {
        setFetchError(true)
      }
    }

    fetchQuotes()
  }, [page])

  return {
    hasMoreQuotes,
    setFetchError,
    setQuoteList,
    fetchError,
    quoteList,
    setPage,
    page,
  }
}
