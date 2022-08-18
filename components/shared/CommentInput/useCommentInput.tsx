import { useTranslation } from 'next-i18next'
import { commentOnQuote } from 'services'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useCommentInput = (quoteId: string, userId: string) => {
  const [fetchError, setFetchError] = useState(false)

  const [commentText, setCommentText] = useState('')

  const { socket } = useSockets()
  const { t } = useTranslation()

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCommentText(e.currentTarget.value)
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      if (commentText.trim().length > 0) {
        const response = await commentOnQuote({ commentText, quoteId, userId })

        if (response.status === 201) {
          socket.emit('ADD_COMMENT', response.data, quoteId)

          setCommentText('')
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
    t,
  }
}
