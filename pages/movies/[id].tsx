import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, MovieDetails } from 'components'
import type { GetStaticProps } from 'next'
import { useMovies } from 'hooks'

const Movie = () => {
  const { movieList } = useMovies()

  return (
    <div>
      <MovieDetails movieList={movieList} />
    </div>
  )
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
        'movies',
        'auth',
      ])),
    },
  }
}
