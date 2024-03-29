import { addNotification, commentOnQuote } from 'services'
import { useLayout, useSockets } from 'hooks'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useCommentInput = (quoteId: string, receiverId: string) => {
  const [fetchError, setFetchError] = useState(false)
  const [commentText, setCommentText] = useState('')

  const { userData } = useLayout()
  const { socket } = useSockets()
  const { t } = useTranslation()

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCommentText(e.currentTarget.value)
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (commentText.trim().length > 0) {
        const response = await commentOnQuote({
          commentText,
          quoteId,
          userId: userData._id,
        })

        if (response.status === 201) {
          socket.emit('ADD_COMMENT', response.data, quoteId)
          setCommentText('')

          if (receiverId !== userData._id) {
            const { data, status } = await addNotification({
              notificationType: 'comment',
              senderId: userData._id,
              receiverId,
            })

            if (status === 201) {
              socket.emit('ADD_NOTIFICATION', data, receiverId)
            }
          }
        }
      }
    } catch (error) {
      setFetchError(true)
    }
  }

  return {
    inputChangeHandler,
    onSubmitHandler,
    setFetchError,
    commentText,
    fetchError,
    userData,
    t,
  }
}
