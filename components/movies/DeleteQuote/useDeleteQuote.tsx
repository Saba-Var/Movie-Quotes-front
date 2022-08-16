import { useTranslation } from 'next-i18next'
import { deleteQuote } from 'services'
import { useSockets } from 'hooks'
import { SetState } from 'types'
import { EVENTS } from 'helpers'
import { useState } from 'react'

export const useDeleteQuote = (
  id: string,
  setDeleteModal: SetState<boolean>
) => {
  const [fetchError, setFetchError] = useState(false)

  const { socket } = useSockets()
  const { t } = useTranslation()

  const deleteHandler = async () => {
    try {
      const response = await deleteQuote(id)

      if (response.status === 200) {
        socket.emit(
          EVENTS.movies.emit.DELETE_MOVIE_QUOTE,
          response.data.deletedQuoteId
        )
        setDeleteModal(false)
      }
    } catch (error) {
      setFetchError(true)
    }
  }

  return { t, deleteHandler, fetchError, setFetchError }
}
