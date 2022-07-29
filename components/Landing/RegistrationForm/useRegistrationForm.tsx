import { SetRegistrationModal, FormData, setShowPopupModal } from './types.d'
import { useTranslation } from 'next-i18next'
import { registerUSer } from 'services'
import { useState } from 'react'

export const useRegistrationForm = (
  setRegistrationModal: SetRegistrationModal,
  setShowPopupModal: setShowPopupModal
) => {
  const { t } = useTranslation()

  const [errorAlert, setErrorAlert] = useState(false)

  const initialValues = {
    confirmPassword: '',
    password: '',
    email: '',
    name: '',
  }

  const submitHandler = async (data: FormData) => {
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
      if (error) {
        setErrorAlert(true)
      }
    }
  }

  return { t, initialValues, submitHandler, errorAlert, setErrorAlert }
}
