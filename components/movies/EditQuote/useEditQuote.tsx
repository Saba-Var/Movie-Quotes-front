import { useTranslation } from 'next-i18next'
import { QuoteText, SetState } from 'types'
import { useQuoteList } from 'components'
import { editQuote } from 'services'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useEditQuote = (
  quoteId: string,
  setEditModal: SetState<boolean>
) => {
  const [fetchError, setFetchError] = useState(false)

  const [file, setFile] = useState<File | null>(null)

  const { quoteList } = useQuoteList()
  const { socket } = useSockets()
  const { t } = useTranslation()

  const currentQuote = quoteList.find((quote) => quote._id === quoteId)

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type.includes('image/')) {
      setFile(e.target.files[0])
    }
  }

  const submitHandler = async (data: QuoteText) => {
    try {
      if (currentQuote?._id) {
        const formData = new FormData()
        formData.append('quoteEn', data.quoteEn)
        formData.append('quoteGe', data.quoteGe)
        formData.append('id', currentQuote?._id)
        if (file) {
          formData.append('image', file)
        }

        const response = await editQuote(formData)

        if (response.status === 200) {
          socket.emit('EDIT_QUOTE', response.data)
          setEditModal(false)
        }
      }
    } catch (error) {
      setFetchError(true)
    }
  }

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${currentQuote?.image}`

  return {
    fileChangeHandler,
    setFetchError,
    submitHandler,
    currentQuote,
    fetchError,
    imageSrc,
    setFile,
    file,
    t,
  }
}
