import { useSession, signOut } from 'next-auth/react'
import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'

export const useHeader = () => {
  const router = useRouter()

  const [showSelector, setShowSelector] = useState(false)
  const [language, setLanguage] = useState('')

  const { t } = useTranslation()

  const { data: session } = useSession()

  const logOutHandler = () => {
    const callBackUri = `/${router.locale}`

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      Router.push(callBackUri)
    }

    if (session) {
      signOut({ redirect: false, callbackUrl: callBackUri })
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
