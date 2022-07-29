import { useRouter } from 'next/router'
import { activateUserAccount } from 'services'
import { useEffect, useState } from 'react'

export const useLanding = () => {
  const [showRegistrationModal, setRegistrationModal] = useState(false)
  const [showActivatedModal, setShowActivatedModal] = useState(false)
  const [showPopupModal, setShowPopupModal] = useState(false)
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
          }
        }
      } catch (error) {
        console.log(error)
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
    showPopupModal,
    setDisappear,
    disappear,
  }
}
