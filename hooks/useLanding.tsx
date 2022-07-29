import { useState } from 'react'

export const useLanding = () => {
  const [showRegistrationModal, setRegistrationModal] = useState(false)
  const [showPopupModal, setShowPopupModal] = useState(false)
  const [disappear, setDisappear] = useState(false)

  return {
    showRegistrationModal,
    setRegistrationModal,
    setShowPopupModal,
    showPopupModal,
    setDisappear,
    disappear,
  }
}
