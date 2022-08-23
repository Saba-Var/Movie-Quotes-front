import { Header, SideMenuWrapper, ErrorAlert } from 'components'
import { LayoutProps } from './types'
import { useLayout } from 'hooks'

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props

  const {
    setShowNotifications,
    setMobileSearchMode,
    showNotifications,
    mobileSearchMode,
    setShowSideMenu,
    setUserDataFail,
    showSideMenu,
    userDataFail,
  } = useLayout()

  return (
    <>
      <div className={`bg-background`}>
        {userDataFail && (
          <ErrorAlert
            styles='left-[50%] -translate-x-1/2'
            title={'common:user-fetch-fail'}
            setShowAlert={setUserDataFail}
          />
        )}

        <Header
          setShowNotifications={setShowNotifications}
          setMobileSearchMode={setMobileSearchMode}
          showNotifications={showNotifications}
          mobileSearchMode={mobileSearchMode}
          setShowSideMenu={setShowSideMenu}
          showSideMenu={showSideMenu}
          page='news-feed'
        />

        <div className='px-0 xl:px-9 pt-[86px] 2xl:!px-0'>
          <SideMenuWrapper
            setShowSideMenu={setShowSideMenu}
            showSideMenu={showSideMenu}
          />
          <div
            className={`1xl:pl-[280px] 2xl:!pl-[340px] lg:!pl-[350px] h-fit ${
              mobileSearchMode && 'overflow-hidden'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
