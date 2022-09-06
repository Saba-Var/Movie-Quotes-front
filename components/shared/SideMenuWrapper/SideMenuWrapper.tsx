import { SideMenuWrapperProps } from './types'
import { SideMenuContent } from 'components'
import { useSideMenu } from './useSideMenu'

const SideMenuWrapper: React.FC<SideMenuWrapperProps> = (props) => {
  const { setShowSideMenu, showSideMenu } = props

  const { closeHandler, closeMenu, setCloseMenu } = useSideMenu(setShowSideMenu)

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
              'z-[9999] animate-slide-from-left fixed left-0 top-18 bg-background h-screen !w-[85vw]'
            } ${closeMenu && 'animate-slide-in-right'}`}
          >
            <div className='pt-9 pl-11'>
              <SideMenuContent
                setShowSideMenu={setShowSideMenu}
                setCloseMenu={setCloseMenu}
              />
            </div>
          </div>
        </div>
      )}

      <div className='hidden fixed 1xl:block 2xl:pl-10 w-[330px] 1xl:pt-[14px]'>
        <SideMenuContent
          setShowSideMenu={setShowSideMenu}
          setCloseMenu={setCloseMenu}
        />
      </div>
    </>
  )
}

export default SideMenuWrapper
