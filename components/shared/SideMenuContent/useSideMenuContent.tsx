import { useNewsFeed } from 'hooks'
import { useRouter } from 'next/router'
import { SetState } from 'types'

export const useSideMenuContent = (
  setShowSideMenu: SetState<boolean>,
  setCloseMenu: SetState<boolean>
) => {
  const { userData, t, imageSrc } = useNewsFeed()
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
    page,
    t,
  }
}
