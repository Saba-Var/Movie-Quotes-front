import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, MovieDetails } from 'components'
import type { GetStaticProps } from 'next'
import { useMovies } from 'hooks'

const Movie = () => {
  const { movieList } = useMovies()

  return (
    <div>{movieList.length > 0 && <MovieDetails movieList={movieList} />}</div>
  )
}

Movie.PageLayout = Layout

export default Movie

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'side-menu',
        'news-feed',
        'landing',
        'common',
        'movies',
        'auth',
      ])),
    },
  }
}
