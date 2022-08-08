import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useNewsFeed } from './useNewsFeed'
import { getAllMovies } from 'services'
import { AllMovie } from 'types'

export const useMovies = () => {
  const { t } = useTranslation()

  const [showAddMovieForm, setShowAddMovieForm] = useState(false)

  const [movieList, setMovieList] = useState<AllMovie>([])

  const { userData } = useNewsFeed()

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        if (userData._id) {
          const response = await getAllMovies(userData._id)
          setMovieList(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllMovies()
  }, [userData._id])

  return { t, showAddMovieForm, setShowAddMovieForm, movieList }
}
