import { useNewsFeed, useSockets } from 'hooks'
import { useTranslation } from 'next-i18next'
import { addQuote } from 'services'
import { QuoteText } from 'types'
import { useState } from 'react'

export const useNewQuote = () => {
  const [duplicateQuotes, setDuplicateQuotes] = useState(false)
  const [emptyFileError, setEmptyFIleError] = useState(false)
  const [movieIdError, setMovieIdError] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const [selectedMovieId, setSelectedMovieId] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { userData } = useNewsFeed()
  const { socket } = useSockets()
  const { t } = useTranslation()

  const clearErrors = () => {
    duplicateQuotes && setDuplicateQuotes(false)
    fetchError && setFetchError(false)
  }

  const closeHandler = () => {
    setEmptyFIleError(false)
    setMovieIdError(false)
    setSelectedMovieId('')
    setFile(null)
    clearErrors()
  }

  const submitHandler = async (data: QuoteText) => {
    if (!emptyFileError && selectedMovieId) {
      try {
        const formData = new FormData()
        formData.append('movie', selectedMovieId)
        formData.append('quoteEn', data.quoteEn)
        formData.append('quoteGe', data.quoteGe)
        formData.append('user', userData._id)
        formData.append('image', file!)

        const response = await addQuote(formData)
        if (response.status === 201) {
          setFile(null)
          setSelectedMovieId('')
          clearErrors()
          setShowAddForm(false)
          socket.emit('ADD_QUOTE_NEWS_FEED', response.data)
        }
      } catch (error: any) {
        if (error.response.status === 409) {
          setDuplicateQuotes(true)
        } else {
          setFetchError(true)
        }
      }
    }
  }

  return {
    setDuplicateQuotes,
    setSelectedMovieId,
    setEmptyFIleError,
    duplicateQuotes,
    selectedMovieId,
    setMovieIdError,
    setShowAddForm,
    emptyFileError,
    setFetchError,
    submitHandler,
    movieIdError,
    closeHandler,
    showAddForm,
    fetchError,
    setFile,
    file,
    t,
  }
}
