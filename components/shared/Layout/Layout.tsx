import { Header, SideMenuWrapper, ErrorAlert } from 'components'
import { useLayout } from './useLayout'
import { LayoutProps } from './types'

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props

  const { setShowSideMenu, showSideMenu, setUserDataFail, userDataFail } =
    useLayout()

  return (
    <div className={`bg-background ${showSideMenu && 'overflow-hidden'}`}>
      {userDataFail && (
        <ErrorAlert
          styles='left-[50%] -translate-x-1/2'
          title={'common:user-fetch-fail'}
          setShowAlert={setUserDataFail}
        />
      )}

      <Header
        setShowSideMenu={setShowSideMenu}
        showSideMenu={showSideMenu}
        page='news-feed'
      />

      <div className='px-0 sm:px-9 pt-[86px]'>
        <SideMenuWrapper
          setShowSideMenu={setShowSideMenu}
          showSideMenu={showSideMenu}
        />
        <div className='1xl:pl-[300px] lg:!pl-[350px] h-fit'>{children}</div>
      </div>
    </div>
  )
}

export default Layout
