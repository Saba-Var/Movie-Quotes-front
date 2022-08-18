import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useMovies } from 'hooks'
import Image from 'next/image'
import {
  AddMovieForm,
  CommentIcon,
  ErrorAlert,
  AddButton,
  Layout,
} from 'components'

const Movies = () => {
  const {
    setShowAddMovieForm,
    setMovieFetchError,
    showAddMovieForm,
    movieFetchError,
    movieList,
    navigate,
    locale,
    t,
  } = useMovies()

  return (
    <div className={`w-full min-h-screen !block pt-[25px] pb-14`}>
      {showAddMovieForm && (
        <AddMovieForm setShowAddMovieForm={setShowAddMovieForm} />
      )}

      {movieFetchError && (
        <ErrorAlert
          styles={'left-1/2 !-translate-x-1/2 1xl:left-[53%]'}
          title={'movies:movie-fetch-failed'}
          setShowAlert={setMovieFetchError}
        />
      )}

      <div>
        <div className='flex justify-between items-center'>
          <div className='1xl:flex-row 1xl:gap-3 flex flex-col animate-focus-in-text-expand'>
            <p className='text-white cursor-default text-2xl font-Helvetica-Neue-Geo font-medium'>
              {t('movies:movies-list')}
            </p>
            <p className='text-white text-base cursor-default 1xl:text-2xl font-Helvetica-Neue-Geo font-medium'>
              {`(${t('movies:total')} ${movieList.length})`}
            </p>
          </div>

          <div className='animate-fade-in'>
            <div className='flex gap-7 items-center'>
              <AddButton
                clickHandler={() => {
                  setShowAddMovieForm(true)
                }}
                title={t('movies:add-movie')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='pt-10 grid gap-y-[60px] grid-cols-1 xl:grid-cols-2 2.5xl:grid-cols-3 place-items-center !px-0'>
        {movieList.map((movie) => {
          const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${movie.image}`
          let movieName =
            locale === 'en' ? movie.movieNameEn : movie.movieNameGe

          if (movieName.length >= 23) {
            movieName = movieName.slice(0, 23) + '...'
          }

          return (
            <div
              className='hover:scale-[1.03] active:scale-100 transition-transform'
              key={movie._id}
            >
              <div
                onClick={() => navigate(movie._id)}
                className='flex flex-col animate-scale-up gap-4 cursor-pointer'
              >
                <div className='text-white overflow-hidden block w-[358px] h-[302px] md:w-[400px] md:h-[331px] relative'>
                  <Image
                    className='rounded-xl'
                    loader={() => imageSrc}
                    unoptimized={true}
                    priority={true}
                    src={imageSrc}
                    layout='fill'
                    alt='movie'
                  />
                </div>
                <p className='font-Helvetica-Neue-Geo font-medium text-white text-2xl'>
                  {movieName}
                </p>
                <div className='flex items-center gap-3'>
                  <p className='font-Helvetica-Neue-Geo animate-fade-in font-medium text-white text-xl'>
                    {movie.quotes?.length}
                  </p>
                  <CommentIcon />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Movies.PageLayout = Layout

export default Movies

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
