import { useState } from 'react'
import { SetState } from 'types'

export const useSideMenu = (setShowSideMenu: SetState<boolean>) => {
  const [closeMenu, setCloseMenu] = useState(false)

  const closeHandler = () => {
    setCloseMenu(true)

    setTimeout(() => {
      setShowSideMenu(false)
      setCloseMenu(false)
    }, 500)
  }

  return {
    closeHandler,
    closeMenu,
  }
}
