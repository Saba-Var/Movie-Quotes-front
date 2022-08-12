import { useTranslation } from 'next-i18next'

export const useRegistrationModal = () => {
  const { t } = useTranslation()

  return { t }
}
