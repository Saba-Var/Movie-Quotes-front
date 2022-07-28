import { SetShowAlert } from './types.d'
import { useState } from 'react'

export const useErrorAlert = (setShowAlert: SetShowAlert) => {
  const [exit, setExit] = useState(false)

  const clickHandler = () => {
    setExit(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 1600)
  }

  return {
    clickHandler,
    exit,
  }
}
