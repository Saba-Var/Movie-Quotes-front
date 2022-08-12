import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useNewsFeed } from './useNewsFeed'
import { getAllMovies } from 'services'
import { useSockets } from 'hooks'
import { AllMovie } from 'types'
import { EVENTS } from 'helpers'

export const useMovies = () => {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false)
  const [movieFetchError, setMovieFetchError] = useState(false)

  const [movieList, setMovieList] = useState<AllMovie>([])

  const { userData } = useNewsFeed()
  const locale = useRouter().locale
  const { socket } = useSockets()
  const { t } = useTranslation()

  socket
    .off(EVENTS.movies.on.SEND_NEW_MOVIE)
    .on(EVENTS.movies.on.SEND_NEW_MOVIE, (data) => {
      setMovieList((prev) => [...prev, data])
    })

  socket
    .off(EVENTS.movies.on.SEND_UPDATED_MOVIE)
    .on(EVENTS.movies.on.SEND_UPDATED_MOVIE, (data) => {
      setMovieList((prev) => {
        return prev.map((movie) => (movie._id === data._id ? data : movie))
      })
    })

  const navigate = (movieId: string) => {
    Router.push(`/${locale}/movies/${movieId}`)
  }

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await getAllMovies(userData._id)
        setMovieList(response.data)
      } catch (error) {
        setMovieFetchError(true)
      }
    }

    if (userData._id) {
      fetchAllMovies()
    }
  }, [userData._id])

  return {
    setShowAddMovieForm,
    setMovieFetchError,
    showAddMovieForm,
    movieFetchError,
    setMovieList,
    movieList,
    navigate,
    locale,
    t,
  }
}
