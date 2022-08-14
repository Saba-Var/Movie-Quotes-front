import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useMovieMultiSelect = () => {
  const [selectedMovieName, setSelectedMovieName] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const locale = useRouter().locale
  const { t } = useTranslation()

  return {
    setSelectedMovieName,
    selectedMovieName,
    setIsOpen,
    locale,
    isOpen,
    t,
  }
}
