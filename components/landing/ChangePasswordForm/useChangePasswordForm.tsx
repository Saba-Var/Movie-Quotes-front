import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { changePassword } from 'services'
import { useRouter } from 'next/router'
import { FormProperties } from 'types'
import { FormData } from './types.d'
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

  const submitHandler = async (
    data: FormData,
    { setFieldError }: FormProperties
  ) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      if (typeof router.query.id === 'string') {
        const { status } = await changePassword(data.password, router.query.id)

        if (status === 200) {
          setChangedSuccessfully(true)
        }
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setFieldError('password', 'user-not-found')
        setUserNotFound(true)
      } else {
        setNotUpdate(true)
      }
    }
  }

  return {
    setChangedSuccessfully,
    changedSuccessfully,
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
