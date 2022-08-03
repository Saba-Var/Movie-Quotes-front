import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { Header } from 'components'
import React from 'react'

const NewsFeed = () => {
  return (
    <div>
      <Header page='news-feed'></Header>
    </div>
  )
}

export default NewsFeed

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'landing', 'auth'])),
    },
  }
}
