import { activateUserAccount } from 'services'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getToken } from 'helpers'

export const useLanding = () => {
  const [showRegistrationModal, setRegistrationModal] = useState(false)
  const [showActivatedModal, setShowActivatedModal] = useState(false)
  const [showPopupModal, setShowPopupModal] = useState(false)
  const [activationFail, setActivationFail] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)
  const [emailForm, setEmailForm] = useState(false)
  const [disappear, setDisappear] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const loggedUserToken = getToken(session)

    if (loggedUserToken !== '') {
      router.push(`/${router.locale}/news-feed`)
    }

    const activateAccount = async () => {
      try {
        const { token } = router.query

        if (typeof token === 'string') {
          const { status } = await activateUserAccount({
            token,
          })

          if (status === 200) {
            setShowActivatedModal(true)
            localStorage.setItem('token', token)
          }
        }
      } catch (error) {
        setActivationFail(true)
      }
    }

    if (router.query.token) {
      activateAccount()
    }
  }, [router, router.query, session])

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
