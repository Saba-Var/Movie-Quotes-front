import { SideMenuWrapperProps } from './types'
import { SideMenuContent } from 'components'
import { useSideMenu } from './useSideMenu'

const SideMenuWrapper: React.FC<SideMenuWrapperProps> = (props) => {
  const { setShowSideMenu, showSideMenu } = props

  const { closeHandler, closeMenu } = useSideMenu(setShowSideMenu)

  return (
    <>
      {showSideMenu && (
        <div className={`1xl:hidden overflow-hidden fixed z-[99]`}>
          <div
            onClick={closeHandler}
            className={`${
              showSideMenu && 'z-[999] fixed top-0 w-screen h-screen'
            }`}
          ></div>
          <div
            className={`w-[240px] ${
              showSideMenu &&
              'z-[9999] animate-slide-from-left fixed left-0 top-0 bg-background h-screen w-[85vw]'
            } ${closeMenu && 'animate-slide-in-right'}`}
          >
            <SideMenuContent />
          </div>
        </div>
      )}

      <div className='hidden 1xl:block  w-[265px] 1xl:pt-[14px]'>
        <SideMenuContent />
      </div>
    </>
  )
}

export default SideMenuWrapper
