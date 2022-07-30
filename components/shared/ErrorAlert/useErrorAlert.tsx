import { useTranslation } from 'next-i18next'
import { SetShowAlert } from './types.d'
import { useState } from 'react'

export const useErrorAlert = (setShowAlert: SetShowAlert, animate: boolean) => {
  const [exit, setExit] = useState(false)
  const { t } = useTranslation()

  const clickHandler = () => {
    setExit(true)

    if (animate) {
      setTimeout(() => {
        setShowAlert(false)
      }, 1600)
    } else {
      setShowAlert(false)
    }
  }

  return {
    clickHandler,
    exit,
    t,
  }
}
