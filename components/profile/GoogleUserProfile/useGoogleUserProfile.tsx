import { useTranslation } from 'next-i18next'
import { changeUsername } from 'services'
import { useRouter } from 'next/router'
import { FormProperties } from 'types'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useGoogleUserProfile = (userId: string) => {
  const [disableUsername, setDisableUsername] = useState(true)
  const [duplicateError, setDuplicateError] = useState(false)

  const locale = useRouter().locale
  const { socket } = useSockets()
  const { t } = useTranslation()

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
    setDuplicateError,
    disableUsername,
    duplicateError,
    submitHandler,
    locale,
    t,
  }
}
