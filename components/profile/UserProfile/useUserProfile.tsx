import { FormProperties, SecondaryEmails, SetState, UserData } from 'types'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useSockets } from 'hooks'
import {
  changePrimaryEmail,
  changeUsername,
  changePassword,
  imageUpload,
} from 'services'

export const useUserProfile = (
  userData: UserData,
  secondaryEmails: SecondaryEmails,
  setUserData: SetState<UserData>
) => {
  const [imageFetchError, setImageFetchError] = useState(false)
  const [disableUsername, setDisableUsername] = useState(true)
  const [disablePassword, setDisablePassword] = useState(true)
  const [duplicateError, setDuplicateError] = useState(false)
  const [emailChange, setEmailChange] = useState(false)
  const [typeError, setTypeError] = useState(false)

  const [passwordLength, setPasswordLength] = useState(0)
  const [file, setFile] = useState<File | null>(null)

  const [userSecondaryEmails, setUserSecondaryEmails] =
    useState<SecondaryEmails>([])

  const [userPrimaryEmail, setUserPrimaryEmail] = useState('')

  useEffect(() => {
    setUserSecondaryEmails(secondaryEmails)
    setUserPrimaryEmail(userData.email)
  }, [userData.email, secondaryEmails])

  useEffect(() => {
    setPasswordLength(+localStorage.getItem('passwordLength')!)
  }, [passwordLength])

  const { socket } = useSockets()
  const { t } = useTranslation()

  const clickHandler = async () => {
    const imageUploadHandler = async () => {
      try {
        const formData = new FormData()
        formData.append('image', file!)
        formData.append('id', userData._id)

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
      } catch (error) {
        setImageFetchError(true)
      }
    }

    const primaryEmailChange = async () => {
      try {
        const response = await changePrimaryEmail(
          userPrimaryEmail,
          userData._id
        )

        if (response.status === 200) {
          localStorage.setItem('token', response.data.token)

          socket.emit(
            'CHANGE_PRIMARY_EMAIL',
            userPrimaryEmail,
            response.data.newSecondaryEmail
          )

          setEmailChange(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (userData.email !== userPrimaryEmail) {
      primaryEmailChange()
    }

    if (file) {
      imageUploadHandler()
    }
  }

  const submitHandler = async (
    form: { username: string; password?: string },
    { setFieldError, resetForm, setFieldValue }: FormProperties
  ) => {
    try {
      if (!disableUsername) {
        const response = await changeUsername(form.username, userData._id)

        if (response.status === 200) {
          socket.emit('CHANGE_USERNAME', form.username)
          setFieldValue('username', form.username)
          setDisableUsername(true)
        }
      }

      if (!disablePassword) {
        const response = await changePassword(form.password!, userData._id)

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
    setUserSecondaryEmails,
    setUserPrimaryEmail,
    userSecondaryEmails,
    setDisableUsername,
    setImageFetchError,
    setDisablePassword,
    setDuplicateError,
    setPasswordLength,
    userPrimaryEmail,
    disableUsername,
    imageFetchError,
    disablePassword,
    passwordLength,
    duplicateError,
    submitHandler,
    setEmailChange,
    setTypeError,
    clickHandler,
    emailChange,
    typeError,
    setFile,
    file,
    t,
  }
}