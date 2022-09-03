import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const useProfileFormWrapper = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const navigateBack = () => {
    router.back()
  }

  return { session, navigateBack }
}
