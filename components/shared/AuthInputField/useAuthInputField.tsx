import { AuthInputFieldProps } from './types.d'
import { useTranslation } from 'next-i18next'
import { useField } from 'formik'

export const useAuthInputField = (data: AuthInputFieldProps) => {
  const { t } = useTranslation()

  const [field, meta] = useField(data)

  const isValid = meta.touched && !meta.error

  const isPasswordField = field.name.toLocaleLowerCase().includes('password')

  return {
    touched: meta.touched,
    error: meta.error,
    isPasswordField,
    isValid,
    field,
    t,
  }
}
