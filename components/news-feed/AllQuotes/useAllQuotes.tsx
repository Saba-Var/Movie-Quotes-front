import { getNewFeedQuotes } from 'services'
import { useEffect, useState } from 'react'
import { quoteSetter } from 'helpers'
import { useSockets } from 'hooks'
import { Quotes } from 'types'

export const useAllQuotes = () => {
  const [hasMoreQuotes, setHasMoreQuotes] = useState(false)

  const [quoteList, setQuoteList] = useState<Quotes>([])

  const [page, setPage] = useState(1)
  const { socket } = useSockets()

  socket
    .off('SEND_NEW_QUOTE_NEWS_FEED')
    .on('SEND_NEW_QUOTE_NEWS_FEED', (quote) => {
      setQuoteList((prev) => [quote, ...prev])
    })

  socket
    .off('SEND_NEW_MOVIE_QUOTES')
    .on('SEND_NEW_MOVIE_QUOTES', (deletedQuoteId) => {
      const existingQuote = quoteList.find(
        (quote) => quote._id === deletedQuoteId
      )

      if (existingQuote) {
        setQuoteList((prev) => {
          return prev.filter((quote) => quote._id !== deletedQuoteId)
        })
      }
    })

  socket.off('SEND_EDITED_QUOTE').on('SEND_EDITED_QUOTE', (data) => {
    const existingQuote = quoteList.find((quote) => quote._id === data._id)

    if (existingQuote) {
      setQuoteList((prev) => {
        return prev.map((quote) => (quote._id === data._id ? data : quote))
      })
    }
  })

  socket.on('SEND_NEW_LIKE', (likeId, quoteId) => {
    const currentQuote = quoteList.find((quote) => quote._id === quoteId)

    if (currentQuote && !currentQuote.likes.includes(likeId)) {
      currentQuote.likes.push(likeId)
      quoteSetter(currentQuote, setQuoteList)
    }
  })

  socket.on('SEND_DISLIKE_QUOTE', (dislikeUser, quoteId) => {
    let currentQuote = quoteList.find((quote) => quote._id === quoteId)

    if (currentQuote && currentQuote.likes.includes(dislikeUser)) {
      currentQuote.likes = currentQuote.likes.filter((like) => {
        return like !== dislikeUser
      })

      quoteSetter(currentQuote, setQuoteList)
    }
  })

  socket.on('SEND_NEW_COMMENT', (comment, quoteId) => {
    const currentQuote = quoteList.find((quote) => quote._id === quoteId)

    if (currentQuote) {
      const existingComment = currentQuote.comments.find(
        (currentComment) => currentComment._id === comment._id
      )

      if (!existingComment) {
        currentQuote.comments.unshift(comment)
        quoteSetter(currentQuote, setQuoteList)
      }
    }
  })

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
      } catch (error) {}
    }

    fetchQuotes()
  }, [page])

  return { setPage, page, hasMoreQuotes, quoteList }
}
