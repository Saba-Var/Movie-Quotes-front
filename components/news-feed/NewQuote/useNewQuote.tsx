import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useNewQuote = () => {
  const [emptyFileError, setEmptyFIleError] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState('')
  const [movieIdError, setMovieIdError] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const [file, setFile] = useState<File | null>(null)

  const { t } = useTranslation()

  return {
    setSelectedMovieId,
    setEmptyFIleError,
    selectedMovieId,
    setMovieIdError,
    emptyFileError,
    setShowAddForm,
    movieIdError,
    showAddForm,
    setFile,
    file,
    t,
  }
}
