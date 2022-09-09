import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useLayout } from 'hooks'
import { SetState } from 'types'

export const useSideMenuContent = (
  setShowSideMenu: SetState<boolean>,
  setCloseMenu: SetState<boolean>
) => {
  const { userData, t, imageSrc } = useLayout()
  const { data: session } = useSession()
  const router = useRouter()

  const page = router.asPath

  const closeHandler = (uri: string) => {
    setCloseMenu(true)
    router.push(`/${router.locale}/${uri}`)

    setTimeout(() => {
      setShowSideMenu(false)
      setCloseMenu(false)
    }, 500)
  }

  return {
    closeHandler,
    userData,
    imageSrc,
    session,
    router,
    page,
    t,
  }
}
