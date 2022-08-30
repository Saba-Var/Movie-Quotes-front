import { changeUsername, imageUpload } from 'services'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FormProperties } from 'types'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useGoogleUserProfile = (userId: string) => {
  const [imageFetchError, setImageFetchError] = useState(false)
  const [disableUsername, setDisableUsername] = useState(true)
  const [duplicateError, setDuplicateError] = useState(false)

  const [file, setFile] = useState<File | null>(null)

  const locale = useRouter().locale
  const { socket } = useSockets()
  const { t } = useTranslation()

  const uploadUserImage = async () => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('id', userId)

        const response = await imageUpload('user', formData)

        if (response.status === 201) {
          socket.emit('UPLOAD_USER_IMAGE', response.data)
          if (disableUsername) {
            setDisableUsername(true)
          }
          setFile(null)
        }
      }
    } catch (error) {
      setImageFetchError(true)
    }
  }

  const submitHandler = async (
    form: { username: string },
    { setFieldError, resetForm, setFieldValue }: FormProperties
  ) => {
    try {
      const response = await changeUsername(form.username, userId)

      if (response.status === 200) {
        socket.emit('CHANGE_USERNAME', form.username)
        setDisableUsername(true)
        resetForm()
        setFieldValue('username', form.username)
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setFieldError('username', 'duplicate-username')
        setDuplicateError(true)
      }
    }
  }

  return {
    setDisableUsername,
    setImageFetchError,
    setDuplicateError,
    uploadUserImage,
    disableUsername,
    imageFetchError,
    duplicateError,
    submitHandler,
    setFile,
    locale,
    file,
    t,
  }
}
