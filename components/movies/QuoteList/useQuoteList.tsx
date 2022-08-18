import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { getMovieQuotes } from 'services'
import { useRouter } from 'next/router'
import { Quotes, Quote } from 'types'
import { useSockets } from 'hooks'

export const useQuoteList = () => {
  const [viewQuoteModal, setViewQuoteModal] = useState(false)
  const [addQuoteModal, setAddQuoteModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const [quoteList, setQuoteList] = useState<Quotes>([])
  const [quoteId, setQuoteId] = useState('')

  const { query, locale } = useRouter()
  const { socket } = useSockets()
  const { t } = useTranslation()

  const quoteSetter = (currentQuote: Quote) => {
    setQuoteList((prev) => {
      return prev.map((quote) =>
        quote._id === currentQuote?._id ? currentQuote : quote
      )
    })
  }

  socket
    .off('SEND_NEW_MOVIE_QUOTES')
    .on('SEND_NEW_MOVIE_QUOTES', (deletedQuoteId) => {
      setQuoteList((prev) => {
        return prev.filter((quote) => quote._id !== deletedQuoteId)
      })
    })

  socket.off('SEND_NEW_QUOTE').on('SEND_NEW_QUOTE', (quote) => {
    setQuoteList((prev) => [quote, ...prev])
  })

  socket.on('SEND_NEW_COMMENT', (comment, quoteId) => {
    const currentQuote = quoteList.find((quote) => quote._id === quoteId)

    if (currentQuote) {
      const existingComment = currentQuote.comments.find(
        (currentComment) => currentComment._id === comment._id
      )

      if (!existingComment) {
        currentQuote.comments.unshift(comment)
        quoteSetter(currentQuote)
      }
    }
  })

  socket.on('SEND_NEW_LIKE', (likeId, quoteId) => {
    const currentQuote = quoteList.find((quote) => quote._id === quoteId)

    if (currentQuote && !currentQuote.likes.includes(likeId)) {
      currentQuote.likes.push(likeId)
      quoteSetter(currentQuote)
    }
  })

  socket.off('SEND_EDITED_QUOTE').on('SEND_EDITED_QUOTE', (data) => {
    setQuoteList((prev) => {
      return prev.map((quote) => (quote._id === data._id ? data : quote))
    })
  })

  socket.on('SEND_DISLIKE_QUOTE', (dislikeUser, quoteId) => {
    let currentQuote = quoteList.find((quote) => quote._id === quoteId)

    if (currentQuote && currentQuote.likes.includes(dislikeUser)) {
      currentQuote.likes = currentQuote.likes.filter((like) => {
        return like !== dislikeUser
      })

      quoteSetter(currentQuote)
    }
  })

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        if (typeof query.id === 'string') {
          const response = await getMovieQuotes(query.id!)
          setQuoteList(response.data)
        }
      } catch (error) {
        setFetchError(true)
      }
    }

    fetchQuotes()
  }, [query.id])

  return {
    setViewQuoteModal,
    setAddQuoteModal,
    viewQuoteModal,
    setDeleteModal,
    addQuoteModal,
    setFetchError,
    setEditModal,
    setQuoteList,
    deleteModal,
    fetchError,
    setQuoteId,
    editModal,
    quoteList,
    quoteId,
    locale,
    t,
  }
}