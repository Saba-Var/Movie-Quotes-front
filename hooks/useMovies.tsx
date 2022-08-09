import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useNewsFeed } from './useNewsFeed'
import { getAllMovies } from 'services'
import { useRouter } from 'next/router'
import { AllMovie } from 'types'
import Router from 'next/router'

export const useMovies = () => {
  const { t } = useTranslation()

  const locale = useRouter().locale

  const [showAddMovieForm, setShowAddMovieForm] = useState(false)

  const [movieList, setMovieList] = useState<AllMovie>([])

  const { userData } = useNewsFeed()

  const navigate = (movieId: string) => {
    Router.push(`/${locale}/movies/${movieId}`)
  }

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await getAllMovies(userData._id)
        setMovieList(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (userData._id) {
      fetchAllMovies()
    }
  }, [userData._id])

  return {
    setShowAddMovieForm,
    showAddMovieForm,
    movieList,
    navigate,
    locale,
    t,
  }
}
