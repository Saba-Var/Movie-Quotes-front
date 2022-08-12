import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { deleteMovie } from 'services'
import { useState } from 'react'

export const useMovieInfo = () => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const locale = useRouter().locale
  const { t } = useTranslation()

  const movieDeleteHandler = async (id: string) => {
    try {
      const { status } = await deleteMovie(id)

      if (status === 200) {
        Router.push(`/${locale}/movies`)
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
