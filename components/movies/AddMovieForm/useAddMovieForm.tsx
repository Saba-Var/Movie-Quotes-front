import { useTranslation } from 'next-i18next'

export const useAddMovieForm = () => {
  const { t } = useTranslation()

  return { t }
}
