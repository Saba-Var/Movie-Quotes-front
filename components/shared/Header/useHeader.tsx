import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

export const useHeader = () => {
  const router = useRouter()

  const [showSelector, setShowSelector] = useState(false)
  const [language, setLanguage] = useState('')

  const { t } = useTranslation()

  const { data: session } = useSession()

  const logOutHandler = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
    }

    if (session?.accessToken) {
      session.accessToken = null
    }

    Router.push(`/${router.locale}`)
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
  }, [router.locale, t])

  return {
    languageChangeHandler,
    setShowSelector,
    logOutHandler,
    showSelector,
    language,
    router,
    t,
  }
}
