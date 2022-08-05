import { useRouter } from 'next/router'
import { SetState } from 'types'
import Router from 'next/router'

export const useSideMenuContent = (
  setShowSideMenu: SetState<boolean>,
  setCloseMenu: SetState<boolean>
) => {
  const router = useRouter()

  const page = router.asPath

  const closeHandler = (uri: string) => {
    setCloseMenu(true)

    Router.push(`/${router.locale}/${uri}`)

    setTimeout(() => {
      setShowSideMenu(false)
      setCloseMenu(false)
    }, 500)
  }

  return { closeHandler, page }
}
