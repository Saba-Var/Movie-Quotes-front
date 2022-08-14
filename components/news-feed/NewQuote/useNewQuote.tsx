import { useTranslation } from 'next-i18next'

export const useNewQuote = () => {
  const { t } = useTranslation()

  return { t }
}
