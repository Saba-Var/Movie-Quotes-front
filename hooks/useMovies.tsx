import { useTranslation } from 'next-i18next'

export const useMovies = () => {
  const { t } = useTranslation()

  return { t }
}
