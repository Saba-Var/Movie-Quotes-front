import { useLayout, useSockets } from 'hooks'
import { useTranslation } from 'next-i18next'
import { QuoteText, SetState } from 'types'
import { useRouter } from 'next/router'
import { addQuote } from 'services'
import { useState } from 'react'

export const useAddQuote = (setAddQuoteModal: SetState<boolean>) => {
  const [duplicateQuotes, setDuplicateQuotes] = useState(false)
  const [emptyFileError, setEmptyFIleError] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const [file, setFile] = useState<File | null>(null)

  const { userData } = useLayout()
  const { id } = useRouter().query
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
          socket.emit('ADD_QUOTE', response.data)
          socket.emit('ADD_QUOTE_NEWS_FEED', response.data)
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
