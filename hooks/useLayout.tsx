import { setCookie, getCookie } from 'cookies-next'
import axios, { getUserDetails } from 'services'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useNewsFeed } from 'hooks'
import { getToken } from 'helpers'
import { UserData } from 'types'

const useLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileSearchMode, setMobileSearchMode] = useState(false)
  const [userDataFail, setUserDataFail] = useState(false)

  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    _id: '',
    notifications: [],
  })

  const { setShowSideMenu, showSideMenu } = useNewsFeed()
  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (!getCookie('token')) {
      setCookie('token', getToken(session))
    }
  }, [session])

  useEffect(() => {
    if (!localStorage.getItem('token') && !session && status !== 'loading') {
      router.push(`/${router.locale}/unauthorized`)
    } else {
      if (session && !getCookie('token')) {
        setCookie('token', session.accessToken)
      }

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

      fetchUserData()
    }
  }, [router, session, setUserDataFail, status])

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`

  return {
    setShowNotifications,
    setMobileSearchMode,
    showNotifications,
    mobileSearchMode,
    setShowSideMenu,
    setUserDataFail,
    showSideMenu,
    userDataFail,
    imageSrc,
    userData,
    t,
  }
}

export default useLayout
