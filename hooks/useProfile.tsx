import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useLayout } from 'hooks'

const useProfile = () => {
  const { data: session } = useSession()
  const { userData } = useLayout()
  const { t } = useTranslation()

  return { t, session, userData }
}

export default useProfile
