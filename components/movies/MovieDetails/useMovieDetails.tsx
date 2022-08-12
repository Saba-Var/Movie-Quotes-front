import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { AllMovie } from 'types'

export const useMovieDetails = (movieList: AllMovie) => {
  const { query } = useRouter()
  const movieId = query.id

  const { t } = useTranslation()

  const currentMovie = movieList.find((movie) => movie._id === movieId)

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${currentMovie?.image}`

  return { currentMovie, imageSrc, t }
}
