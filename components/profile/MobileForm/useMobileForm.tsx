import { FormProperties, SetState, UpdatedList } from 'types'
import { changePassword, changeUsername } from 'services'
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
  setFieldValue: (field: string, value: string) => void,
  setUpdatedList: SetState<UpdatedList>
) => {
  const [duplicateUsernameError, setDuplicateUsernameError] = useState('')

  const [passwordErrorAlert, setPasswordErrorAlert] = useState(false)
  const [saveChangesModal, setSaveChangesModal] = useState(false)

  const { data: session } = useSession()
  const { back } = useRouter()
  const { socket } = useSockets()
  const { t } = useTranslation()

  const navigateBack = () => {
    back()
  }

  const submitHandler = async (
    form: { username: string; password: string },
    { setFieldError }: FormProperties
  ) => {
    const changeUsernameHandler = async () => {
      try {
        const response = await changeUsername(form.username, userId)

        if (response.status === 200) {
          socket.emit('CHANGE_USERNAME', form.username)
          setFieldValue('username', form.username)
          updateAlertList(setUpdatedList, 'username-updated')
          closeForm(true)
        }
      } catch (error: any) {
        setFieldError('username', 'duplicate-username')
        setDuplicateUsernameError(form.username)
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
    }

    const passwordChangeHandler = async () => {
      try {
        const response = await changePassword(form.password!, userId)

        if (response.status === 200) {
          localStorage.setItem('passwordLength', form.password.length + '')
          setFieldValue('confirmPassword', '')
          setFieldValue('password', '')
          updateAlertList(setUpdatedList, 'password-updated')
          closeForm(true)
        }
      } catch (error) {
        setPasswordErrorAlert(true)
      }
    }

    if (saveChangesModal) {
      if (type === 'username') {
        changeUsernameHandler()
      } else if (type === 'password') {
        passwordChangeHandler()
      }
    }
  }

  return {
    setDuplicateUsernameError,
    duplicateUsernameError,
    setPasswordErrorAlert,
    setSaveChangesModal,
    passwordErrorAlert,
    saveChangesModal,
    submitHandler,
    navigateBack,
    session,
    t,
  }
}
