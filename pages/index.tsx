import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Header, FilmList } from 'components'
import type { GetStaticProps } from 'next'
import { useEffect } from 'react'
import Router from 'next/router'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'landing'])),
    },
  }
}

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem('language') === 'Geo') {
      Router.push('./ge')
    }
  }, [])

  return (
    <div>
      <Header page='home' />
      <FilmList />
    </div>
  )
}

export default Home
