import { MovieDetailsTextareaProps } from './types.d'
import { useTranslation } from 'next-i18next'
import { useField } from 'formik'

export const useMovieDetailsTextarea = (data: MovieDetailsTextareaProps) => {
  const { t } = useTranslation()

  const [field, meta] = useField(data)

  const isValid = meta.touched && !meta.error
  const isError = meta.error && meta.touched

  return {
    isValid,
    isError,
    field,
    t,
  }
}