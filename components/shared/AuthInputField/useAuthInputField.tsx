import { AuthInputFieldProps } from './types.d'
import { useTranslation } from 'next-i18next'
import { useField } from 'formik'

export const useAuthInputField = (data: AuthInputFieldProps) => {
  const { t } = useTranslation()

  const [field, meta] = useField(data)

  const isValid = meta.touched && !meta.error

  return {
    touched: meta.touched,
    error: meta.error,
    isValid,
    field,
    t,
  }
}
