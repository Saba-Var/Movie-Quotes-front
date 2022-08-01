import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { changePassword } from 'services'
import { useRouter } from 'next/router'
import axios from 'services'

export const useChangePasswordForm = () => {
  const [changedSuccessfully, setChangedSuccessfully] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [notUpdate, setNotUpdate] = useState(false)

  const [showForm, setShowForm] = useState(false)

  const [token, setToken] = useState('token')

  const router = useRouter()

  const { t } = useTranslation()

  useEffect(() => {
    const { emailVerificationToken } = router.query

    if (typeof emailVerificationToken === 'string') {
      setToken(emailVerificationToken)
      setShowModal(true)
      setShowForm(true)
    }
  }, [router.query])

  const submitHandler = async (password: string) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const { status } = await changePassword(password)

      if (status === 200) {
        setChangedSuccessfully(true)
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setUserNotFound(true)
      } else {
        setNotUpdate(true)
      }
    }
  }

  return {
    setChangedSuccessfully,
    changedSuccessfully,
    setUserNotFound,
    submitHandler,
    userNotFound,
    setNotUpdate,
    setShowModal,
    setShowForm,
    notUpdate,
    showModal,
    showForm,
    t,
  }
}
