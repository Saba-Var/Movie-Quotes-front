import { useTranslation } from 'next-i18next'
import { userImageUpload } from 'helpers'
import { changeUsername } from 'services'
import { FormProperties } from 'types'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useGoogleUserProfile = (userId: string) => {
  const [usernameUpdateAlert, setUsernameUpdateAlert] = useState(false)
  const [imageUpdateAlert, setImageUpdateAlert] = useState(false)
  const [imageFetchError, setImageFetchError] = useState(false)
  const [disableUsername, setDisableUsername] = useState(true)
  const [duplicateError, setDuplicateError] = useState(false)
  const [typeError, setTypeError] = useState(false)

  const [file, setFile] = useState<File | null>(null)

  const { socket } = useSockets()
  const { t } = useTranslation()

  const uploadUserImage = async () => {
    if (file) {
      userImageUpload(
        socket,
        file,
        setFile,
        userId,
        disableUsername,
        setDisableUsername,
        typeError,
        setTypeError,
        setImageFetchError,
        setImageUpdateAlert
      )
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
        setUsernameUpdateAlert(true)
        setDisableUsername(true)
        resetForm()
        setFieldValue('username', form.username)
      }
    } catch (error: any) {
      setFieldError('username', 'duplicate-username')
      setDuplicateError(true)
    }
  }

  return {
    setUsernameUpdateAlert,
    setImageUpdateAlert,
    usernameUpdateAlert,
    setDisableUsername,
    setImageFetchError,
    setDuplicateError,
    imageUpdateAlert,
    uploadUserImage,
    disableUsername,
    imageFetchError,
    duplicateError,
    submitHandler,
    setTypeError,
    typeError,
    setFile,
    file,
    t,
  }
}
