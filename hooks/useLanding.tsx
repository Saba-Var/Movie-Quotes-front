import { useState } from 'react'

export const useLanding = () => {
  const [showRegistrationModal, setRegistrationModal] = useState(false)
  const [disappear, setDisappear] = useState(false)

  return {
    showRegistrationModal,
    setRegistrationModal,
    disappear,
    setDisappear,
  }
}
