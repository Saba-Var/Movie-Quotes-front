import { FormProperties, SetState, UpdatedList } from 'types'
import { addSecondaryEmail, changePassword, changeUsername } from 'services'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { updateAlertList } from 'helpers'
import { useRouter } from 'next/router'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useMobileForm = (
  type: 'username' | 'password' | 'email',
  userId: string,
  closeForm: SetState<boolean>,
  setUpdatedList: SetState<UpdatedList>,
  setFieldValue?: (field: string, value: string) => void
) => {
  const [duplicateUsernameError, setDuplicateUsernameError] = useState('')

  const [passwordErrorAlert, setPasswordErrorAlert] = useState(false)
  const [saveChangesError, setSaveChangesError] = useState(false)
  const [saveChangesModal, setSaveChangesModal] = useState(false)

  const { data: session } = useSession()
  const { back } = useRouter()
  const { socket } = useSockets()
  const { t } = useTranslation()

  const navigateBack = () => {
    back()
  }

  const submitHandler = async (
    form: { username: string; password: string; email: string },
    { setFieldError }: FormProperties
  ) => {
    const changeUsernameHandler = async () => {
      try {
        const response = await changeUsername(form.username, userId)

        if (response.status === 200) {
          socket.emit('CHANGE_USERNAME', form.username)
          setFieldValue && setFieldValue('username', form.username)
          updateAlertList(setUpdatedList, 'username-updated')
          closeForm(true)
        }
      } catch (error: any) {
        setSaveChangesError(true)
        setFieldError('username', 'duplicate-username')
        setDuplicateUsernameError(form.username)
        setSaveChangesModal(false)
      }
    }

    const passwordChangeHandler = async () => {
      try {
        const response = await changePassword(form.password!, userId)

        if (response.status === 200) {
          if (setFieldValue) {
            setFieldValue('confirmPassword', '')
            setFieldValue('password', '')
          }
          updateAlertList(setUpdatedList, 'password-updated')
          closeForm(true)
        }
      } catch (error) {
        setSaveChangesError(true)
        setPasswordErrorAlert(true)
      }
    }

    const addEmailHandler = async () => {
      try {
        const response = await addSecondaryEmail(form.email, userId!)

        if (response.status === 201) {
          socket.emit('ADD_SECONDARY_EMAIL', response.data)
          updateAlertList(setUpdatedList, 'email-updated')
          closeForm(true)
        }
      } catch (error) {
        setSaveChangesError(true)
        setFieldError('email', 'email-is-added')
        setSaveChangesModal(false)
      }
    }

    if (!saveChangesModal) {
      if (type === 'username') {
        if (duplicateUsernameError !== form.username) {
          setSaveChangesModal(true)
        } else {
          setFieldError('username', 'duplicate-username')
        }
      }

      if (type === 'password') {
        setSaveChangesModal(true)
      }

      if (type === 'email') {
        setSaveChangesModal(true)
      }
    }

    if (saveChangesModal) {
      if (type === 'username') {
        changeUsernameHandler()
      } else if (type === 'password') {
        passwordChangeHandler()
      } else {
        addEmailHandler()
      }
    }
  }

  return {
    setDuplicateUsernameError,
    duplicateUsernameError,
    setPasswordErrorAlert,
    setSaveChangesModal,
    passwordErrorAlert,
    saveChangesError,
    saveChangesModal,
    submitHandler,
    navigateBack,
    session,
    t,
  }
}
