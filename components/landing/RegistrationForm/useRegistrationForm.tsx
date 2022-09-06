import { FormProperties, SetState } from 'types'
import { useTranslation } from 'next-i18next'
import { registerUSer } from 'services'
import { FormData } from './types'
import { useState } from 'react'

export const useRegistrationForm = (
  setRegistrationModal: SetState<boolean>,
  setShowPopupModal: SetState<boolean>
) => {
  const [duplicateUser, setDuplicateUser] = useState(true)
  const [errorAlert, setErrorAlert] = useState(false)

  const { t } = useTranslation()

  const initialValues = {
    confirmPassword: '',
    password: '',
    email: '',
    name: '',
  }

  const submitHandler = async (
    data: FormData,
    { setFieldError }: FormProperties
  ) => {
    try {
      const { status } = await registerUSer(data)

      if (status === 201) {
        setRegistrationModal(false)
        setShowPopupModal(true)

        if (errorAlert) {
          setErrorAlert(false)
        }
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setFieldError('name', 'user-exists')
        setDuplicateUser(true)
      } else {
        setErrorAlert(true)
      }
    }
  }

  return {
    initialValues,
    submitHandler,
    setErrorAlert,
    duplicateUser,
    errorAlert,
    t,
  }
}
