import { useTranslation } from 'next-i18next'
import { verifyEmail } from 'services'
import { FormProperties } from 'types'
import { useState } from 'react'

export const useEmailForm = () => {
  const [fetchFailed, setFetchFailed] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const { t } = useTranslation()

  const submitHandler = async (
    formData: { email: string },
    { setFieldError }: FormProperties
  ) => {
    try {
      const { status } = await verifyEmail(formData.email)

      if (status === 200) {
        setEmailSent(true)
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setFieldError('email', 'user-not-found')
        setNotFound(true)
      } else {
        setFetchFailed(true)
      }
    }
  }

  return {
    setFetchFailed,
    submitHandler,
    setEmailSent,
    fetchFailed,
    emailSent,
    notFound,
    t,
  }
}
