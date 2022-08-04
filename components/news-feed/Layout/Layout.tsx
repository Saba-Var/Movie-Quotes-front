import { Header, SideMenuWrapper } from 'components'
import { LayoutProps } from './types.d'
import { useNewsFeed } from 'hooks'

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props

  const { setShowSideMenu, showSideMenu } = useNewsFeed()

  return (
    <div className={`bg-background ${showSideMenu && 'overflow-hidden'}`}>
      <Header page='news-feed' setShowSideMenu={setShowSideMenu} />

      <div className='flex px-9 lg:px-[70px] gap-16 lg:gap-[122px] pt-[86px]'>
        <SideMenuWrapper
          setShowSideMenu={setShowSideMenu}
          showSideMenu={showSideMenu}
        />
        {children}
      </div>
    </div>
  )
}

export default Layout
