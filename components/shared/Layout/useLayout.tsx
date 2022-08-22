import { setCookie, getCookie } from 'cookies-next'
import { useSession } from 'next-auth/react'
import { useNewsFeed } from 'hooks'
import { getToken } from 'helpers'
import { useEffect, useState } from 'react'

export const useLayout = () => {
  const { data: session } = useSession()

  const [mobileSearchMode, setMobileSearchMode] = useState(false)

  const { setShowSideMenu, showSideMenu, setUserDataFail, userDataFail } =
    useNewsFeed()

  useEffect(() => {
    if (!getCookie('token')) {
      setCookie('token', getToken(session))
    }
  }, [session])

  return {
    setMobileSearchMode,
    mobileSearchMode,
    setShowSideMenu,
    setUserDataFail,
    showSideMenu,
    userDataFail,
  }
}
