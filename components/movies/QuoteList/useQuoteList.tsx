import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { getMovieQuotes } from 'services'
import { useRouter } from 'next/router'
import { Quotes } from 'types'
import {
  useDislikeQuote,
  useCommentQuote,
  useDeleteQuote,
  useLikeQuote,
  useEditQuote,
  useSockets,
} from 'hooks'

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

  socket.off('SEND_NEW_QUOTE').on('SEND_NEW_QUOTE', (quote) => {
    setQuoteList((prev) => [quote, ...prev])
  })

  useCommentQuote(quoteList, setQuoteList)
  useDislikeQuote(quoteList, setQuoteList)
  useDeleteQuote(quoteList, setQuoteList)
  useEditQuote(quoteList, setQuoteList)
  useLikeQuote(quoteList, setQuoteList)

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
