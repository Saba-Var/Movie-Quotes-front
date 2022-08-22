import { useSession, signOut } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { HrefData } from './types.d'

export const useHeader = () => {
  const router = useRouter()

  const [showSelector, setShowSelector] = useState(false)

  const [language, setLanguage] = useState('')

  const { t } = useTranslation()

  const { data: session } = useSession()

  let hrefData: HrefData = router.pathname

  const logOutHandler = () => {
    const callBackUri = `/${router.locale}`

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      deleteCookie('token')
      router.push(callBackUri)
    }

    if (session) {
      deleteCookie('token')
      signOut({ callbackUrl: callBackUri })
    }
  }

  const languageChangeHandler = (lan: string) => {
    setShowSelector(false)
    localStorage.setItem('language', lan)
  }

  useEffect(() => {
    if (router.locale === 'en') {
      return setLanguage(t('common:Eng'))
    }

    setLanguage(t('common:Geo'))
  }, [router.locale, router.pathname, t])

  if (typeof router.query.id === 'string') {
    hrefData = { pathname: '/movies/[id]', query: { id: router.query.id! } }
  }

  return {
    languageChangeHandler,
    setShowSelector,
    logOutHandler,
    showSelector,
    hrefData,
    language,
    router,
    t,
  }
}
