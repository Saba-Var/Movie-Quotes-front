import { FormProperties, SecondaryEmails, UpdatedList, UserData } from 'types'
import { changeUsername, changePassword, deleteEmail } from 'services'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useSockets } from 'hooks'
import {
  changeUserPrimaryEmail,
  userImageUpload,
  updateAlertList,
} from 'helpers'

export const useUserProfile = (
  userData: UserData,
  secondaryEmails: SecondaryEmails
) => {
  const [emailsMobileModal, setEmailsMobileModal] = useState(false)
  const [imageFetchError, setImageFetchError] = useState(false)
  const [saveChangesFail, setFailChangesFail] = useState(false)
  const [duplicateError, setDuplicateError] = useState(false)
  const [addEmailModal, setAddEmailModal] = useState(false)
  const [emailChange, setEmailChange] = useState(false)
  const [typeError, setTypeError] = useState(false)

  const [disableUsername, setDisableUsername] = useState(true)
  const [disablePassword, setDisablePassword] = useState(true)

  const [userPrimaryEmail, setUserPrimaryEmail] = useState('')

  const [file, setFile] = useState<File | null>(null)

  const [deleteEmailList, setDeleteEmailList] = useState<string[]>([])
  const [updatedList, setUpdatedList] = useState<UpdatedList>([])
  const [userSecondaryEmails, setUserSecondaryEmails] =
    useState<SecondaryEmails>([])

  useEffect(() => {
    setUserSecondaryEmails(secondaryEmails)
    setUserPrimaryEmail(userData.email)
  }, [userData.email, secondaryEmails])

  const { socket } = useSockets()
  const { t } = useTranslation()

  const clickHandler = async () => {
    const deleteSecondaryEmail = async (email: string) => {
      try {
        await deleteEmail(email, userData._id!)
      } catch (error) {
        setFailChangesFail(true)
      }
    }

    if (userData.email !== userPrimaryEmail) {
      changeUserPrimaryEmail(
        userPrimaryEmail,
        userData._id,
        socket,
        setUpdatedList,
        setFailChangesFail,
        setEmailChange
      )
    } else {
      setEmailChange(false)
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
        setImageFetchError,
        setUpdatedList
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
          updateAlertList(setUpdatedList, 'username-updated')
          setDisableUsername(true)
          resetForm()
          setFieldValue('username', form.username)
        }
      }

      if (!disablePassword) {
        const response = await changePassword(form.password!, userData._id)
        if (response.status === 200) {
          setDisablePassword(true)
          setFieldValue('confirmPassword', '')
          setFieldValue('password', '')
          resetForm()
          updateAlertList(setUpdatedList, 'password-updated')
        }
      }
    } catch (error: any) {
      if (error.response.data.message.includes('username')) {
        setFieldError('username', 'duplicate-username')
        setDuplicateError(true)
      }
    }
  }

  const formCancelHandler = (
    resetForm: () => void,
    setFieldValue: (value: string, newValue: string) => void
  ) => {
    setDisableUsername(true)
    setDisablePassword(true)
    resetForm()
    setFieldValue('username', userData.name)

    setUserSecondaryEmails(userData.secondaryEmails!)
    setUserPrimaryEmail(userData.email)
    if (file) {
      setFile(null)
    }
    setDeleteEmailList([])
    setEmailChange(false)
  }

  return {
    setUserSecondaryEmails,
    setEmailsMobileModal,
    userSecondaryEmails,
    setUserPrimaryEmail,
    setFailChangesFail,
    setDeleteEmailList,
    setDisableUsername,
    setImageFetchError,
    setDisablePassword,
    formCancelHandler,
    setDuplicateError,
    emailsMobileModal,
    userPrimaryEmail,
    setAddEmailModal,
    deleteEmailList,
    saveChangesFail,
    disableUsername,
    imageFetchError,
    disablePassword,
    setUpdatedList,
    setEmailChange,
    duplicateError,
    submitHandler,
    addEmailModal,
    setTypeError,
    clickHandler,
    updatedList,
    emailChange,
    typeError,
    setFile,
    file,
    t,
  }
}
