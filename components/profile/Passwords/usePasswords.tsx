import { useTranslation } from 'next-i18next'

export const usePasswords = () => {
  const { t } = useTranslation()

  return { t }
}
