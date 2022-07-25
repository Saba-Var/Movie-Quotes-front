import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { Header, FilmList } from 'components'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'landing'])),
    },
  }
}

const Home = () => {
  return (
    <div>
      <Header page='home' />
      <FilmList />
    </div>
  )
}

export default Home
