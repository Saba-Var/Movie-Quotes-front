import { setCookie, getCookie } from 'cookies-next'
import axios, { getUserDetails } from 'services'
import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getToken } from 'helpers'
import { UserData } from 'types'

export const useNewsFeed = () => {
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [userDataFail, setUserDataFail] = useState(false)

  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    _id: '',
  })

  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const router = useRouter()

  const navigate = (routeUri: string) => {
    router.push(`/${routeUri}`)
  }

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
  }, [router.locale, session, status])

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`

  return {
    setUserDataFail,
    setShowSideMenu,
    showSideMenu,
    userDataFail,
    userData,
    imageSrc,
    navigate,
    t,
  }
}
