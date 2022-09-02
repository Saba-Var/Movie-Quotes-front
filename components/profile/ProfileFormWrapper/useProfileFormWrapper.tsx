import { useSession } from 'next-auth/react'

export const useProfileFormWrapper = () => {
  const { data: session } = useSession()

  return { session }
}
