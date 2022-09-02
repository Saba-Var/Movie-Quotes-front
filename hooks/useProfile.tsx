import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useLayout } from 'hooks'

const useProfile = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { userData, setUserData, setSecondaryEmailError, secondaryEmailError } =
    useLayout()

  return {
    setSecondaryEmailError,
    secondaryEmailError,
    setUserData,
    userData,
    session,
    t,
  }
}

export default useProfile
