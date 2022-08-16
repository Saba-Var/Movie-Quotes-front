import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { getMovieQuotes } from 'services'
import { useRouter } from 'next/router'
import { useSockets } from 'hooks'
import { EVENTS } from 'helpers'
import { Quotes } from 'types'

export const useQuoteList = () => {
  const [quoteList, setQuoteList] = useState<Quotes>([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [quoteId, setQuoteId] = useState('')

  const { query, locale } = useRouter()
  const { socket } = useSockets()
  const { t } = useTranslation()

  socket
    .off(EVENTS.movies.on.SEND_NEW_MOVIE_QUOTES)
    .on(EVENTS.movies.on.SEND_NEW_MOVIE_QUOTES, (deletedQuoteId) => {
      setQuoteList((prev) => {
        return prev.filter((quote) => quote._id !== deletedQuoteId)
      })
    })

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        if (typeof query.id === 'string') {
          const response = await getMovieQuotes(query.id!)
          setQuoteList(response.data)
        }
      } catch (error) {}
    }

    fetchQuotes()
  }, [query.id])

  return {
    setDeleteModal,
    setQuoteList,
    deleteModal,
    setQuoteId,
    quoteList,
    quoteId,
    locale,
    t,
  }
}
