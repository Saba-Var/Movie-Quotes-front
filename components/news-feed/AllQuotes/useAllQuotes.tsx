import { useSession } from 'next-auth/react'
import { getNewFeedQuotes } from 'services'
import { useEffect, useState } from 'react'
import { getToken } from 'helpers'
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
import axios from 'axios'

export const useAllQuotes = () => {
  const [hasMoreQuotes, setHasMoreQuotes] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const [quoteList, setQuoteList] = useState<Quotes>([])

  const { data: session } = useSession()
  const [page, setPage] = useState(1)
  const { socket } = useSockets()

  useEffect(() => {
    if (session && !localStorage.getItem('token')) {
      const token = getToken(session!)

      if (typeof token === 'string') {
        localStorage.setItem('token', token)
      }
    }
  }, [session])

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
        if (getToken(session)) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${getToken(
            session!
          )}`

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
        }
      } catch (error) {
        setFetchError(true)
      }
    }

    fetchQuotes()
  }, [page, session])

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
