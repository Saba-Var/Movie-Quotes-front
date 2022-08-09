import { Header, SideMenuWrapper, ErrorAlert } from 'components'
import { LayoutProps } from './types'
import { useNewsFeed } from 'hooks'

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props

  const { setShowSideMenu, showSideMenu, setUserDataFail, userDataFail } =
    useNewsFeed()

  return (
    <div className={`bg-background ${showSideMenu && 'overflow-hidden'}`}>
      {userDataFail && (
        <ErrorAlert
          styles='left-[50%] -translate-x-1/2'
          title={'common:user-fetch-fail'}
          setShowAlert={setUserDataFail}
        />
      )}

      <Header page='news-feed' setShowSideMenu={setShowSideMenu} />

      <div className='px-9 pt-[86px]'>
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
