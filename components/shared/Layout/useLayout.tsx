import { setCookie, getCookie } from 'cookies-next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useNewsFeed } from 'hooks'
import { getToken } from 'helpers'

export const useLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileSearchMode, setMobileSearchMode] = useState(false)

  const { data: session } = useSession()
  const { setShowSideMenu, showSideMenu, setUserDataFail, userDataFail } =
    useNewsFeed()

  useEffect(() => {
    if (!getCookie('token')) {
      setCookie('token', getToken(session))
    }
  }, [session])

  return {
    setShowNotifications,
    setMobileSearchMode,
    showNotifications,
    mobileSearchMode,
    setShowSideMenu,
    setUserDataFail,
    showSideMenu,
    userDataFail,
  }
}
