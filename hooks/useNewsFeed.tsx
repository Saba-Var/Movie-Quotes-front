import Router, { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useNewsFeed = () => {
  const { data: session, status } = useSession()

  const [showSideMenu, setShowSideMenu] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token') && !session && status !== 'loading') {
      Router.push(`/${router.locale}/unauthorized`)
    }
  }, [router.locale, session, status])

  return { showSideMenu, setShowSideMenu }
}
