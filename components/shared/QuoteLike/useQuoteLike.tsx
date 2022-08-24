import { likeQuote, dislikeQuote, addNotification } from 'services'
import { useSockets, useLayout } from 'hooks'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useQuoteLike = (receiverId: string) => {
  const [dislikeError, setDislikeError] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const { userData } = useLayout()
  const { socket } = useSockets()
  const { t } = useTranslation()

  const likeHandler = async (quoteId: string, userId: string) => {
    try {
      const response = await likeQuote(quoteId, userId)
      if (response.status === 200) {
        socket.emit('LIKE_QUOTE', response.data, quoteId)

        if (receiverId !== userData._id) {
          const { data, status } = await addNotification({
            notificationType: 'like',
            senderId: userData._id,
            receiverId,
          })

          if (status === 201) {
            socket.emit('ADD_NOTIFICATION', data, receiverId)
          }
        }
      }
    } catch (error) {
      setFetchError(true)
    }
  }

  const dislikeHandler = async (quoteId: string, userId: string) => {
    try {
      const response = await dislikeQuote(quoteId, userId)

      if (response.status === 200) {
        socket.emit('DISLIKE_QUOTE', response.data, quoteId)
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
    userData,
    t,
  }
}
