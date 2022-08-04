import axios, { getUserDetails } from 'services'
import Router, { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { UserData } from 'types'

export const useNewsFeed = () => {
  const { data: session, status } = useSession()

  const [showSideMenu, setShowSideMenu] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    _id: '',
  })

  const router = useRouter()

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

  console.log(userData)

  return { showSideMenu, setShowSideMenu, userData }
}
