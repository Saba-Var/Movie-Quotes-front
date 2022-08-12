import { activateUserAccount } from 'services'
import { useEffect, useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export const useLanding = () => {
  const [showRegistrationModal, setRegistrationModal] = useState(false)
  const [showActivatedModal, setShowActivatedModal] = useState(false)
  const [emailForm, setEmailForm] = useState(false)

  const [showPopupModal, setShowPopupModal] = useState(false)
  const [activationFail, setActivationFail] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)

  const [disappear, setDisappear] = useState(false)

  const { query } = useRouter()

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const { token } = query

        if (typeof token === 'string') {
          const { status } = await activateUserAccount({
            token: token,
          })

          if (status === 200) {
            setShowActivatedModal(true)
            localStorage.setItem('token', token)
            setCookie('token', token)
          }
        }
      } catch (error) {
        setActivationFail(true)
      }
    }

    activateAccount()
  }, [query])

  return {
    showRegistrationModal,
    setShowActivatedModal,
    setRegistrationModal,
    showActivatedModal,
    setShowPopupModal,
    setActivationFail,
    activationFail,
    showPopupModal,
    setDisappear,
    setEmailForm,
    setShowLogIn,
    emailForm,
    disappear,
    showLogIn,
  }
}
