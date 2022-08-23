import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const useNotifications = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return { t, locale }
}
