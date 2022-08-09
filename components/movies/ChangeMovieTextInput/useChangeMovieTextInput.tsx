import { ChangeMovieTextInputProps } from './types.d'
import { useTranslation } from 'next-i18next'
import { useField } from 'formik'

export const useChangeMovieTextInput = (data: ChangeMovieTextInputProps) => {
  const { t } = useTranslation()

  const [field, meta] = useField(data)

  const isValid = meta.touched && !meta.error
  const isError = meta.error && meta.touched

  return { t, isError, isValid, field }
}
