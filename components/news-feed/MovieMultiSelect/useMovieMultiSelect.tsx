import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMovies } from 'hooks'

export const useMovieMultiSelect = () => {
  const [selectedMovieName, setSelectedMovieName] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  const locale = useRouter().locale
  const { movieList } = useMovies()
  const { t } = useTranslation()

  return {
    setSelectedMovieName,
    selectedMovieName,
    movieList,
    setIsOpen,
    locale,
    isOpen,
    t,
  }
}
