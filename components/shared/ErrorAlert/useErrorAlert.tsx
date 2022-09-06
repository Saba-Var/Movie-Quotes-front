import { useTranslation } from 'next-i18next'
import { SetShowAlert } from './types.d'

export const useErrorAlert = (setShowAlert: SetShowAlert) => {
  const { t } = useTranslation()

  const clickHandler = () => {
    setShowAlert(false)
  }

  return {
    clickHandler,
    t,
  }
}
