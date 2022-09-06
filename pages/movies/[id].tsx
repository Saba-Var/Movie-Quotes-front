import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, MovieDetails } from 'components'
import type { GetStaticProps } from 'next'
import { useMovies } from 'hooks'
import Head from 'next/head'

const Movie = () => {
  const { movieList } = useMovies()

  return (
    <>
      <Head>
        <title>Movies</title>
        <meta
          content='initial-scale=1.0, width=device-width'
          name='viewport'
          key='Movies'
        />
      </Head>

      <div>
        {movieList.length > 0 && <MovieDetails movieList={movieList} />}
      </div>
    </>
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
