import { likeQuote, dislikeQuote } from 'services'
import { useTranslation } from 'next-i18next'
import { useSockets } from 'hooks'
import { EVENTS } from 'helpers'
import { useState } from 'react'

export const useQuoteLike = () => {
  const [dislikeError, setDislikeError] = useState(false)
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

  const dislikeHandler = async (quoteId: string, userId: string) => {
    try {
      const response = await dislikeQuote(quoteId, userId)

      if (response.status === 200) {
        socket.emit(EVENTS.movies.emit.DISLIKE_QUOTE, response.data, quoteId)
      }
    } catch (error) {
      setDislikeError(true)
    }
  }

  return {
    setDislikeError,
    dislikeHandler,
    setFetchError,
    dislikeError,
    likeHandler,
    fetchError,
    t,
  }
}
