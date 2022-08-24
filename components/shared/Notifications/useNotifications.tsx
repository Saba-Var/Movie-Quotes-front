import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useLayout } from 'hooks'

export const useNotifications = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const { notificationsList, setPage, page, hasMoreNotifications } = useLayout()

  const englishLan = locale === 'en'

  return {
    hasMoreNotifications,
    notificationsList,
    englishLan,
    setPage,
    page,
    t,
  }
}
