import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useNewsFeed } from 'hooks'
import { Header } from 'components'
import React from 'react'

const NewsFeed = () => {
  const {} = useNewsFeed()

  return (
    <div>
      <Header page='news-feed'></Header>
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
