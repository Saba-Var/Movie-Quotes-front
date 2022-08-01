import { useTranslation } from 'next-i18next'
import { verifyEmail } from 'services'
import { useState } from 'react'

export const useEmailForm = () => {
  const { t } = useTranslation()

  const [notFound, setNotFound] = useState(false)

  const [fetchFailed, setFetchFailed] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const submitHandler = async (formData: { email: string }) => {
    try {
      const { status } = await verifyEmail(formData.email)

      if (status === 200) {
        setEmailSent(true)
      }
    } catch (error: any) {
      if (error.response.status === 404) {
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
    setNotFound,
    emailSent,
    notFound,
    t,
  }
}
