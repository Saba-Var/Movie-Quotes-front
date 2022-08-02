import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { authorization } from 'services'
import { LogInData } from 'types'
import { useState } from 'react'

export const useLogIn = () => {
  const [emailForm, setEmailForm] = useState(false)

  const [notVerified, setNotVerified] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const locale = useRouter().locale
  const { t } = useTranslation()

  const submitHandler = async (data: LogInData) => {
    try {
      const response = await authorization(data)

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        Router.push(`/${locale}/news-feed`)
      }
    } catch (error: any) {
      const status = error.response.status

      if (status === 404) {
        setNotFound(true)
      } else if (status === 403) {
        setNotVerified(true)
      } else {
        setAuthError(true)
      }
    }
  }

  return {
    setNotVerified,
    submitHandler,
    setAuthError,
    setEmailForm,
    setNotFound,
    notVerified,
    authError,
    emailForm,
    notFound,
    t,
  }
}
