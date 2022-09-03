import { FormProperties, SecondaryEmails, UserData } from 'types'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { userImageUpload } from 'helpers'
import { useSockets } from 'hooks'
import {
  changePrimaryEmail,
  changeUsername,
  changePassword,
  deleteEmail,
} from 'services'

export const useUserProfile = (
  userData: UserData,
  secondaryEmails: SecondaryEmails
) => {
  const [imageFetchError, setImageFetchError] = useState(false)
  const [saveChangesFail, setFailChangesFail] = useState(false)
  const [duplicateError, setDuplicateError] = useState(false)
  const [addEmailModal, setAddEmailModal] = useState(false)
  const [emailChange, setEmailChange] = useState(false)
  const [typeError, setTypeError] = useState(false)

  const [disableUsername, setDisableUsername] = useState(true)
  const [disablePassword, setDisablePassword] = useState(true)

  const [userPrimaryEmail, setUserPrimaryEmail] = useState('')

  const [passwordLength, setPasswordLength] = useState(0)

  const [file, setFile] = useState<File | null>(null)

  const [deleteEmailList, setDeleteEmailList] = useState<string[]>([])
  const [userSecondaryEmails, setUserSecondaryEmails] =
    useState<SecondaryEmails>([])

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
        setFailChangesFail(true)
      }
    }

    const deleteSecondaryEmail = async (email: string) => {
      try {
        await deleteEmail(email, userData._id!)
      } catch (error) {
        setFailChangesFail(true)
      }
    }

    if (userData.email !== userPrimaryEmail) {
      primaryEmailChange()
    }

    if (file) {
      userImageUpload(
        socket,
        file,
        setFile,
        userData._id,
        disableUsername,
        setDisableUsername,
        typeError,
        setTypeError,
        setImageFetchError
      )
    }

    if (deleteEmailList.length > 0) {
      deleteEmailList.forEach((email) => {
        deleteSecondaryEmail(email)
        socket.emit('DELETE_EMAIL', email)
      })

      setEmailChange(false)
      setDeleteEmailList([])
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
    userSecondaryEmails,
    setUserPrimaryEmail,
    setFailChangesFail,
    setDeleteEmailList,
    setDisableUsername,
    setImageFetchError,
    setDisablePassword,
    setDuplicateError,
    setPasswordLength,
    userPrimaryEmail,
    setAddEmailModal,
    deleteEmailList,
    saveChangesFail,
    disableUsername,
    imageFetchError,
    disablePassword,
    passwordLength,
    setEmailChange,
    duplicateError,
    submitHandler,
    addEmailModal,
    setTypeError,
    clickHandler,
    emailChange,
    typeError,
    setFile,
    file,
    t,
  }
}
