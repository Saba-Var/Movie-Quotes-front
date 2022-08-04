import axios, { getUserDetails } from 'services'
import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { UserData } from 'types'

export const useNewsFeed = () => {
  const { data: session, status } = useSession()

  const { t } = useTranslation()

  const [showSideMenu, setShowSideMenu] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    _id: '',
  })

  const router = useRouter()

  const navigate = (routeUri: string) => {
    Router.push(`/${routeUri}`)
  }

  useEffect(() => {
    if (!localStorage.getItem('token') && !session && status !== 'loading') {
      Router.push(`/${router.locale}/unauthorized`)
    } else {
      const fetchUserData = async () => {
        try {
          let token: string | null = 'token'

          if (localStorage?.getItem('token')) {
            token = localStorage?.getItem('token')
          } else if (typeof session?.accessToken === 'string') {
            token = session.accessToken
          }

          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const { data } = await getUserDetails(token)
            setUserData(data)
          }
        } catch (error: any) {
          console.log(error)
        }
      }

      fetchUserData()
    }
  }, [router.locale, session, status])

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`

  return { showSideMenu, setShowSideMenu, userData, imageSrc, t, navigate }
}
