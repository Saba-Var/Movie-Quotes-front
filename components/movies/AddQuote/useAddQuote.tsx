import { useNewsFeed, useSockets } from 'hooks'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { addQuote } from 'services'
import { QuoteText, SetState } from 'types'
import { useState } from 'react'
import { EVENTS } from 'helpers'

export const useAddQuote = (setAddQuoteModal: SetState<boolean>) => {
  const [duplicateQuotes, setDuplicateQuotes] = useState(false)
  const [emptyFileError, setEmptyFIleError] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const { id } = useRouter().query

  const { userData } = useNewsFeed()
  const { socket } = useSockets()
  const { t } = useTranslation()

  const submitHandler = async (data: QuoteText) => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('quoteEn', data.quoteEn)
        formData.append('quoteGe', data.quoteGe)
        formData.append('user', userData._id)
        formData.append('image', file)
        if (typeof id === 'string') {
          formData.append('movie', id)
        }

        const response = await addQuote(formData)

        if (response.status === 201) {
          socket.emit(EVENTS.movies.emit.ADD_QUOTE, response.data)
          setAddQuoteModal(false)
        }
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setDuplicateQuotes(true)
      } else {
        setFetchError(true)
      }
    }
  }

  return {
    setDuplicateQuotes,
    setEmptyFIleError,
    duplicateQuotes,
    emptyFileError,
    submitHandler,
    setFetchError,
    fetchError,
    setFile,
    file,
    t,
  }
}
