import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Header, FilmList } from 'components'
import type { GetStaticProps } from 'next'

const Home = () => {
  return (
    <div>
      <Header page='home' />
      <FilmList />
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'landing'])),
    },
  }
}
