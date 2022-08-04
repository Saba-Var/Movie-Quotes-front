import { useSideMenu } from './useSideMenu'
import { SideMenuWrapperProps } from './types'

const SideMenuWrapper: React.FC<SideMenuWrapperProps> = (props) => {
  const { setShowSideMenu, showSideMenu } = props

  const { closeHandler, closeMenu } = useSideMenu(setShowSideMenu)

  return (
    <div>
      {showSideMenu && (
        <div className={`1xl:hidden overflow-hidden`}>
          <div
            onClick={closeHandler}
            className={`${
              showSideMenu && 'z-[999] fixed top-0 w-screen h-screen'
            }`}
          ></div>
          <div
            className={`text-red-600 w-[240px] ${
              showSideMenu &&
              'z-[9999] animate-slide-from-left fixed left-0 top-0 bg-background h-screen w-[75vw]'
            } ${closeMenu && 'animate-slide-in-right'}`}
          >
            sidemenu
          </div>
        </div>
      )}
    </div>
  )
}

export default SideMenuWrapper
