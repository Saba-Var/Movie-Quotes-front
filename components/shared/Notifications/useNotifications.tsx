import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useLayout } from 'hooks'

export const useNotifications = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const {
    setNotificationFetchFail,
    notificationFetchFail,
    hasMoreNotifications,
    notificationsList,
    setPage,
    page,
  } = useLayout()

  const englishLan = locale === 'en'

  return {
    setNotificationFetchFail,
    notificationFetchFail,
    hasMoreNotifications,
    notificationsList,
    englishLan,
    setPage,
    page,
    t,
  }
}
