import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const useHeader = () => {
  const router = useRouter()

  const [showSelector, setShowSelector] = useState(false)
  const [language, setLanguage] = useState('')

  const { t } = useTranslation()

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
    showSelector,
    language,
    router,
    t,
  }
}
