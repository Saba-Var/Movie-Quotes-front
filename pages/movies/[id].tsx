import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Layout } from 'components'

const Movie = () => {
  const { query } = useRouter()
  const movieId = query.id

  return <div className='w-full h-screen bg-gray-600 !block'>{movieId}</div>
}

Movie.PageLayout = Layout

export default Movie

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'side-menu',
        'landing',
        'common',
        'auth',
      ])),
    },
  }
}
