import { changeUsername, imageUpload, changePassword } from 'services'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { FormProperties } from 'types'
import { useSockets } from 'hooks'

export const useUserProfile = (userId: string) => {
  const [imageFetchError, setImageFetchError] = useState(false)
  const [disableUsername, setDisableUsername] = useState(true)
  const [disablePassword, setDisablePassword] = useState(true)
  const [duplicateError, setDuplicateError] = useState(false)
  const [typeError, setTypeError] = useState(false)

  const [passwordLength, setPasswordLength] = useState(0)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    setPasswordLength(+localStorage.getItem('passwordLength')!)
  }, [passwordLength])

  const { socket } = useSockets()
  const { t } = useTranslation()

  const clickHandler = async () => {
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
          if (typeError) {
            setTypeError(false)
          }
        }
      }
    } catch (error) {
      setImageFetchError(true)
    }
  }

  const submitHandler = async (
    form: { username: string; password?: string },
    { setFieldError, resetForm, setFieldValue }: FormProperties
  ) => {
    try {
      if (!disableUsername) {
        const response = await changeUsername(form.username, userId)

        if (response.status === 200) {
          socket.emit('CHANGE_USERNAME', form.username)
          setFieldValue('username', form.username)
          setDisableUsername(true)
        }
      }

      if (!disablePassword) {
        const response = await changePassword(form.password!, userId)

        if (response.status === 200) {
          setDisablePassword(true)
          localStorage.setItem('passwordLength', form.password?.length + '')
          setPasswordLength(form.password?.length!)
          setFieldValue('confirmPassword', '')
          setFieldValue('password', '')
        }
      }

      resetForm()
    } catch (error: any) {
      if (error.response.data.message.includes('username')) {
        setFieldError('username', 'duplicate-username')
        setDuplicateError(true)
      }
    }
  }

  return {
    setDisableUsername,
    setImageFetchError,
    setDisablePassword,
    setDuplicateError,
    setPasswordLength,
    disableUsername,
    imageFetchError,
    disablePassword,
    passwordLength,
    duplicateError,
    submitHandler,
    setTypeError,
    clickHandler,
    typeError,
    setFile,
    file,
    t,
  }
}
