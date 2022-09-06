import { FormProperties, LogInData } from 'types'
import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { authorization } from 'services'
import { setCookie } from 'cookies-next'
import { useState } from 'react'

export const useLogIn = () => {
  const [notVerified, setNotVerified] = useState(false)
  const [emailForm, setEmailForm] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const locale = useRouter().locale
  const { t } = useTranslation()

  const submitHandler = async (
    data: LogInData,
    { setFieldError }: FormProperties
  ) => {
    try {
      const response = await authorization(data)

      if (response.status === 200) {
        const token = response.data.token
        localStorage.setItem('token', token)
        setCookie('token', token)
        Router.push(`/${locale}/news-feed`)
      }
    } catch (error: any) {
      const status = error.response.status

      if (status === 404 || status === 401) {
        setNotFound(true)
        setFieldError('email', 'user-not-found')
        setFieldError('password', 'user-not-found')
      } else if (status === 403) {
        setNotVerified(true)
        setFieldError('email', 'not-verified')
      } else {
        setAuthError(true)
      }
    }
  }

  return {
    submitHandler,
    setAuthError,
    setEmailForm,
    notVerified,
    authError,
    emailForm,
    notFound,
    t,
  }
}
