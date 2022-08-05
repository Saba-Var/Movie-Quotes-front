import { Header, SideMenuWrapper } from 'components'
import { LayoutProps } from './types'
import { useNewsFeed } from 'hooks'

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props

  const { setShowSideMenu, showSideMenu } = useNewsFeed()

  return (
    <div className={`bg-background ${showSideMenu && 'overflow-hidden'}`}>
      <Header page='news-feed' setShowSideMenu={setShowSideMenu} />

      <div className='px-9 pt-[86px]'>
        <SideMenuWrapper
          setShowSideMenu={setShowSideMenu}
          showSideMenu={showSideMenu}
        />
        <div className='1xl:pl-[300px] lg:!pl-[350px]'>{children}</div>
      </div>
    </div>
  )
}

export default Layout
