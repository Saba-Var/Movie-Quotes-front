import { useTranslation } from 'next-i18next'

export const useRegistrationForm = () => {
  const { t } = useTranslation()

  const initialValues = {
    confirmPassword: '',
    password: '',
    email: '',
    name: '',
  }

  return { t, initialValues }
}
