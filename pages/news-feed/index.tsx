import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Header, SideMenuWrapper } from 'components'
import type { GetStaticProps } from 'next'
import { useNewsFeed } from 'hooks'
import Movies from './movies'
import React from 'react'

const NewsFeed = () => {
  const { setShowSideMenu, showSideMenu } = useNewsFeed()

  return (
    <div className={`bg-background ${showSideMenu && 'overflow-hidden'}`}>
      <Header page='news-feed' setShowSideMenu={setShowSideMenu} />

      <div className='flex px-9 lg:px-[70px] gap-16 lg:gap-[122px] pt-[86px]'>
        <SideMenuWrapper
          setShowSideMenu={setShowSideMenu}
          showSideMenu={showSideMenu}
        />

        <Movies />
      </div>
    </div>
  )
}

export default NewsFeed

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['landing', 'common', 'auth'])),
    },
  }
}
