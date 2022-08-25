import axios, { getUserDetails, getUserNotifications } from 'services'
import { useNewsFeed, useSockets } from 'hooks'
import { UserData, Notification } from 'types'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getToken } from 'helpers'

const useLayout = () => {
  const [notificationFetchFail, setNotificationFetchFail] = useState(false)
  const [hasMoreNotifications, setHasMoreNotifications] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileSearchMode, setMobileSearchMode] = useState(false)
  const [userDataFail, setUserDataFail] = useState(false)

  const [newNotificationCount, setNewNotificationCount] = useState(0)
  const [page, setPage] = useState(1)

  const [notificationsList, setNotificationsList] = useState<Notification[]>([])

  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    _id: '',
  })

  const { setShowSideMenu, showSideMenu } = useNewsFeed()
  const { data: session, status } = useSession()
  const { socket } = useSockets()
  const { t } = useTranslation()
  const router = useRouter()

  // const uniqueList = notificationsList.map((el) => {
  //   if (el._id !== newNotification._id) {
  //     return el
  //   }
  // })
  // uniqueList.unshift(newNotification)

  useEffect(() => {
    socket.on('SEND_NEW_NOTIFICATION', (newNotification, receiverId) => {
      if (userData._id === receiverId && newNotification) {
        setNewNotificationCount(newNotificationCount + 1)
        setNotificationsList((prev) => {
          if (
            prev.find(
              (notification) => notification._id === newNotification._id
            )
          ) {
            return prev
          } else {
            return [newNotification, ...prev]
          }
        })
      }
    })
  }, [
    newNotificationCount,
    setNotificationsList,
    notificationsList,
    userData._id,
    socket,
  ])

  useEffect(() => {
    if (!localStorage.getItem('token') && !session && status !== 'loading') {
      router.push(`/${router.locale}/unauthorized`)
    } else {
      const fetchUserData = async () => {
        try {
          const token = getToken(session)

          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const { data } = await getUserDetails(token)
            setUserData(data)
          }
        } catch (error: any) {
          setUserDataFail(true)
        }
      }

      if (!userData._id) {
        fetchUserData()
      }
    }
  }, [router, session, status, userData._id])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (userData._id) {
          const { status, data } = await getUserNotifications(
            userData._id,
            page
          )
          setHasMoreNotifications(data.paginationInfo.hasMoreNotifications)

          if (status === 200 && data.notifications) {
            setNotificationsList((prev) => [...prev, ...data.notifications])
            setNewNotificationCount(data.newNotificationCount)
          }
        }
      } catch (error) {
        setNotificationFetchFail(true)
      }
    }

    fetchNotifications()
  }, [page, userData._id])

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`

  return {
    setNotificationFetchFail,
    setNewNotificationCount,
    notificationFetchFail,
    setShowNotifications,
    hasMoreNotifications,
    setNotificationsList,
    newNotificationCount,
    setMobileSearchMode,
    notificationsList,
    showNotifications,
    mobileSearchMode,
    setShowSideMenu,
    setUserDataFail,
    showSideMenu,
    userDataFail,
    imageSrc,
    userData,
    setPage,
    page,
    t,
  }
}

export default useLayout
