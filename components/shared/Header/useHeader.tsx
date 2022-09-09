import { useSession, signOut } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HrefData } from './types.d'

export const useHeader = () => {
  const [showSelector, setShowSelector] = useState(false)

  const [language, setLanguage] = useState('')

  const { data: session } = useSession()
  const { t } = useTranslation()
  const router = useRouter()

  let hrefData: HrefData = router.pathname

  const logOutHandler = () => {
    const callBackUri = `/${router.locale}`

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      if (session) {
        signOut({ callbackUrl: callBackUri })
      } else {
        router.push(callBackUri)
      }
    }

    if (session) {
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
