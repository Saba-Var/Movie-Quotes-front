import { useTranslation } from 'next-i18next'

export const useEmailForm = () => {
  const { t } = useTranslation()

  const defaultValue = { email: '' }

  return { t, defaultValue }
}
