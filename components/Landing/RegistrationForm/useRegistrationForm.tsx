import { SetRegistrationModal, FormData } from './types.d'
import { useTranslation } from 'next-i18next'
import { registerUSer } from 'services'

export const useRegistrationForm = (
  setRegistrationModal: SetRegistrationModal
) => {
  const { t } = useTranslation()

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
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return { t, initialValues, submitHandler }
}
