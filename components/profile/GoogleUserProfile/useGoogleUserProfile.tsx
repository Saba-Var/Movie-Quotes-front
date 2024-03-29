import { userImageUpload, updateAlertList } from 'helpers'
import { FormProperties, UpdatedList } from 'types'
import { useTranslation } from 'next-i18next'
import { changeUsername } from 'services'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useGoogleUserProfile = (userId: string) => {
  const [updatedList, setUpdatedList] = useState<UpdatedList>([])

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
        setUpdatedList
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
        updateAlertList(setUpdatedList, 'username-updated')
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
    setDisableUsername,
    setImageFetchError,
    setDuplicateError,
    uploadUserImage,
    disableUsername,
    imageFetchError,
    duplicateError,
    setUpdatedList,
    submitHandler,
    setTypeError,
    updatedList,
    typeError,
    setFile,
    file,
    t,
  }
}
