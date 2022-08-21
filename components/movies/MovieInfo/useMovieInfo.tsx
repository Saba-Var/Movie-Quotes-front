import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { deleteMovie } from 'services'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useMovieInfo = () => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteError, setDeleteError] = useState(false)

  const locale = useRouter().locale
  const { socket } = useSockets()
  const { t } = useTranslation()

  const movieDeleteHandler = async (id: string) => {
    try {
      const response = await deleteMovie(id)

      if (response.status === 200) {
        Router.push(`/${locale}/movies`)
        socket.emit('DELETE_MOVIE', response.data.deletedMovieId)
      }
    } catch (error) {
      setDeleteError(true)
    }
  }

  return {
    movieDeleteHandler,
    setShowEditForm,
    setDeleteModal,
    setDeleteError,
    showEditForm,
    deleteError,
    deleteModal,
    locale,
    t,
  }
}
