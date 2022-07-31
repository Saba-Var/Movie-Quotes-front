import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useChangePasswordForm = () => {
  const [changedSuccessfully, setChangedSuccessfully] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [token, setToken] = useState('token')

  const router = useRouter()

  const { t } = useTranslation()

  useEffect(() => {
    const { emailVerificationToken } = router.query

    if (typeof emailVerificationToken === 'string') {
      setToken(emailVerificationToken)
      setShowForm(true)
    }
  }, [router.query])

  return {
    changedSuccessfully,
    setShowForm,
    showForm,
    t,
  }
}
