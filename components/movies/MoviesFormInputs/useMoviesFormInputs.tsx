import { useTranslation } from 'next-i18next'

export const useMoviesFormInputs = () => {
  const { t } = useTranslation()

  return { t }
}
