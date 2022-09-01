import { useTranslation } from 'next-i18next'

export const useEmails = () => {
  const { t } = useTranslation()

  return {
    t,
  }
}
