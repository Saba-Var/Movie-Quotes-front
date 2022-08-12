import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { SetState } from 'types'

export const useImageDragAndDrop = (
  setEmptyFIleError: SetState<boolean>,
  setFile: SetState<File | null>,
  emptyFileError: boolean
) => {
  const { t } = useTranslation()
  const [typeError, setTypeError] = useState(false)

  const errorClearHandler = () => {
    if (emptyFileError) {
      setEmptyFIleError(false)
    }

    if (typeError) {
      setTypeError(false)
    }
  }

  const handleChange = (file: File) => {
    setFile(file)
    errorClearHandler()
  }

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type.includes('image/')) {
      setFile(e.target.files[0])
      errorClearHandler()
    }
  }

  return {
    fileChangeHandler,
    handleChange,
    setTypeError,
    typeError,
    t,
  }
}
