import { useTranslation } from 'next-i18next'
import { likeQuote } from 'services'
import { useSockets } from 'hooks'
import { EVENTS } from 'helpers'
import { useState } from 'react'

export const useQuoteLike = () => {
  const [fetchError, setFetchError] = useState(false)

  const { socket } = useSockets()
  const { t } = useTranslation()

  const likeHandler = async (quoteId: string, userId: string) => {
    try {
      const response = await likeQuote(quoteId, userId)

      if (response.status === 200) {
        socket.emit(EVENTS.movies.emit.LIKE_QUOTE, response.data, quoteId)
      }
    } catch (error) {
      setFetchError(true)
    }
  }

  return { t, likeHandler, fetchError, setFetchError }
}
