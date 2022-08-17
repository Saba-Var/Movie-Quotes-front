import { useTranslation } from 'next-i18next'
import { commentOnQuote } from 'services'
import { useSockets } from 'hooks'
import { EVENTS } from 'helpers'
import { useState } from 'react'

export const useCommentInput = (quoteId: string, userId: string) => {
  const { t } = useTranslation()

  const [commentText, setCommentText] = useState('')

  const { socket } = useSockets()

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCommentText(e.currentTarget.value)
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (commentText.trim().length > 0) {
      const response = await commentOnQuote({ commentText, quoteId, userId })

      if (response.status === 201) {
        socket.emit(EVENTS.quotes.emit.ADD_COMMENT, response.data, quoteId)

        setCommentText('')
      }
    }
  }

  return { t, inputChangeHandler, onSubmitHandler, commentText }
}
