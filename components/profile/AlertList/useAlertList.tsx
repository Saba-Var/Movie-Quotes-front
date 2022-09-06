import { useTranslation } from 'next-i18next'

export const useAlertList = () => {
  const { t } = useTranslation()

  return { t }
}
