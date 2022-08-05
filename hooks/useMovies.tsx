import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useMovies = () => {
  const { t } = useTranslation()

  const [showAddMovieForm, setShowAddMovieForm] = useState(false)

  return { t, showAddMovieForm, setShowAddMovieForm }
}
