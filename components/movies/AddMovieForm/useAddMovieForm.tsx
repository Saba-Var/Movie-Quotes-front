import axios, { getFilmGenres, addNewMovie } from 'services'
import { SelectedOptions, SetState } from 'types'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { MovieFormData } from 'types'
import { useNewsFeed } from 'hooks'
import { getToken } from 'helpers'

export const useAddMovieForm = (setShowAddMovieForm: SetState<boolean>) => {
  const [genresFetchError, setGenresFetchError] = useState(false)
  const [genreNotSelected, setGenreNotSelected] = useState(false)
  const [existingMovieErr, setExistingMovieErr] = useState(false)
  const [emptyFileError, setEmptyFIleError] = useState(false)
  const [filmAddErr, setFilmAddErr] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [filmGenres, setFilmGenres] = useState([''])
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>([
    { value: '', label: '' },
  ])
  const { data: session } = useSession()
  const { t } = useTranslation()

  const { userData } = useNewsFeed()

  const emptyInputHandler = () => {
    const emptyValue = selectedOptions.find((genre) => genre.value === '')
    if (
      emptyValue ||
      (!emptyValue && selectedOptions.length === 0) ||
      typeof selectedOptions === 'undefined'
    ) {
      setGenreNotSelected(true)
    }

    if (!file) {
      setEmptyFIleError(true)
    }
  }

  useEffect(() => {
    const fetchFilmGenres = async () => {
      try {
        const { data, status } = await getFilmGenres()

        if (status === 200) {
          setFilmGenres(data)
        }
      } catch (error) {
        setGenresFetchError(true)
      }
    }

    fetchFilmGenres()
  }, [])

  const submitHandler = async (data: MovieFormData) => {
    try {
      if (!emptyFileError && !genreNotSelected) {
        const selectedGenres = []
        for (const key in selectedOptions) {
          selectedGenres.push(selectedOptions[key].value)
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${getToken(
          session
        )}`

        const formData = new FormData()
        formData.append('movie_description_en', data.movie_description_en)
        formData.append('movie_description_ge', data.movie_description_ge)
        formData.append('movie_name_en', data.movie_name_en)
        formData.append('movie_name_ge', data.movie_name_ge)
        formData.append('director_en', data.director_en)
        formData.append('director_ge', data.director_ge)
        formData.append('userId', userData._id)
        formData.append('budget', data.budget)
        formData.append('image', file!)
        if (selectedGenres.length === 1) {
          formData.append('film_genres[]', selectedGenres[0])
        } else {
          for (const genre of selectedGenres) {
            formData.append('film_genres', genre)
          }
        }

        const { status } = await addNewMovie(formData)

        if (status === 201) {
          setShowAddMovieForm(false)
        }
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setExistingMovieErr(true)
      } else {
        setFilmAddErr(true)
      }
    }
  }

  return {
    setExistingMovieErr,
    setGenresFetchError,
    setGenreNotSelected,
    setSelectedOptions,
    setEmptyFIleError,
    emptyInputHandler,
    existingMovieErr,
    genresFetchError,
    genreNotSelected,
    selectedOptions,
    emptyFileError,
    setFilmAddErr,
    submitHandler,
    filmAddErr,
    filmGenres,
    setFile,
    file,
    t,
  }
}
