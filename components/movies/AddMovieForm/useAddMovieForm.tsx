import { FormProperties, SelectedOptions, SetState } from 'types'
import axios, { getMovieGenres, addNewMovie } from 'services'
import { useLayout, useSockets } from 'hooks'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { MovieFormData } from 'types'
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
  const { userData } = useLayout()
  const { socket } = useSockets()
  const { t } = useTranslation()

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
        const { data, status } = await getMovieGenres()

        if (status === 200) {
          setFilmGenres(data)
        }
      } catch (error) {
        setGenresFetchError(true)
      }
    }

    fetchFilmGenres()
  }, [])

  const submitHandler = async (
    data: MovieFormData,
    { setFieldError }: FormProperties
  ) => {
    try {
      if (!emptyFileError && !genreNotSelected) {
        const {
          movieDescriptionEn,
          movieDescriptionGe,
          movieNameEn,
          movieNameGe,
          directorEn,
          directorGe,
          budget,
        } = data

        const selectedGenres = []
        for (const key in selectedOptions) {
          selectedGenres.push(selectedOptions[key].value)
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${getToken(
          session
        )}`

        const formData = new FormData()
        formData.append('movieDescriptionEn', movieDescriptionEn)
        formData.append('movieDescriptionGe', movieDescriptionGe)
        formData.append('movieNameEn', movieNameEn)
        formData.append('movieNameGe', movieNameGe)
        formData.append('directorEn', directorEn)
        formData.append('directorGe', directorGe)
        formData.append('budget', budget)
        formData.append('userId', userData._id)
        formData.append('image', file!)

        if (selectedGenres.length === 1) {
          formData.append('movieGenres[]', selectedGenres[0])
        } else {
          for (const genre of selectedGenres) {
            formData.append('movieGenres', genre)
          }
        }

        const response = await addNewMovie(formData)

        if (response.status === 201) {
          socket.emit('ADD_MOVIE', response.data)
          setShowAddMovieForm(false)
        }
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setFieldError('movieNameEn', 'movie-exists')
        setFieldError('movieNameGe', 'movie-exists')
        setExistingMovieErr(true)
      } else {
        setFilmAddErr(true)
      }
    }
  }

  return {
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
