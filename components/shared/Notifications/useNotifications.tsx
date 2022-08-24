import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { markAsRead } from 'services'
import { useLayout } from 'hooks'
import { SetState } from 'types'
import { useState } from 'react'

export const useNotifications = (setNewNotificationCount: SetState<number>) => {
  const {
    setNotificationFetchFail,
    notificationFetchFail,
    hasMoreNotifications,
    setNotificationsList,
    newNotificationCount,
    notificationsList,
    userData,
    setPage,
    page,
  } = useLayout()

  const [markAsReadError, setMarkAsReadError] = useState(false)

  const { t } = useTranslation()
  const { locale } = useRouter()

  const markAsReadHandler = async () => {
    try {
      if (notificationsList.length > 0 && newNotificationCount > 0) {
        const { status } = await markAsRead(userData._id)

        if (status === 200) {
          const readeList = notificationsList.map((notification) => {
            if (notification.new) {
              notification.new = false
            }
            return notification
          })

          setNewNotificationCount(0)
          setNotificationsList(readeList)
        }
      }
    } catch (error) {
      setMarkAsReadError(true)
    }
  }

  const englishLan = locale === 'en'

  return {
    setNotificationFetchFail,
    notificationFetchFail,
    hasMoreNotifications,
    setMarkAsReadError,
    markAsReadHandler,
    notificationsList,
    markAsReadError,
    englishLan,
    setPage,
    page,
    t,
  }
}
