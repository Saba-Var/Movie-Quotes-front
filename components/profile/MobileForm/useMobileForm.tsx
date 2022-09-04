import { FormProperties, SetState } from 'types'
import { useTranslation } from 'next-i18next'
import { changeUsername } from 'services'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useMobileForm = (
  type: 'username' | 'password' | 'email',
  userId: string,
  closeForm: SetState<boolean>,
  setFieldValue: (field: string, value: string) => void
) => {
  const [duplicateUsernameError, setDuplicateUsernameError] = useState('')
  const [saveChangesModal, setSaveChangesModal] = useState(false)

  const { socket } = useSockets()
  const { t } = useTranslation()

  const submitHandler = async (
    form: { username: string },
    { setFieldError }: FormProperties
  ) => {
    const changeUsernameHandler = async () => {
      try {
        const response = await changeUsername(form.username, userId)

        if (response.status === 200) {
          socket.emit('CHANGE_USERNAME', form.username)
          setFieldValue('username', form.username)
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
    }

    if (type === 'username' && saveChangesModal) {
      changeUsernameHandler()
    }
  }

  return {
    setDuplicateUsernameError,
    duplicateUsernameError,
    setSaveChangesModal,
    saveChangesModal,
    submitHandler,
    t,
  }
}
