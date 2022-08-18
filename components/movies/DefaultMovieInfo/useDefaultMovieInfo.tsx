import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMovies } from 'hooks'

export const useDefaultMovieInfo = () => {
  const { query, locale } = useRouter()
  const { movieList } = useMovies()
  const { t } = useTranslation()

  const currentMovie = movieList.find((movie) => movie._id === query.id)

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${currentMovie?.image}`

  const movieName =
    locale === 'en' ? currentMovie?.movieNameEn : currentMovie?.movieNameGe

  const directorName =
    locale === 'en' ? currentMovie?.directorEn : currentMovie?.directorGe

  return {
    movieGenres: currentMovie?.movieGenres,
    image: currentMovie?.image,
    directorName,
    movieName,
    imageSrc,
    t,
  }
}
