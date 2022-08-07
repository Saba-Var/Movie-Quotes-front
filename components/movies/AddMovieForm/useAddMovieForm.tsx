import axios, { getFilmGenres, addNewMovie, imageUpload } from 'services'
import { SelectedOptions, MovieData, SetState } from 'types'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getToken } from 'helpers'

export const useAddMovieForm = (setShowAddMovieForm: SetState<boolean>) => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>([
    { value: '', label: '' },
  ])

  const [filmGenres, setFilmGenres] = useState([''])
  const [file, setFile] = useState<File | null>(null)

  const [genresFetchError, setGenresFetchError] = useState(false)
  const [emptyFileError, setEmptyFIleError] = useState(false)

  const [genreNotSelected, setGenreNotSelected] = useState(false)

  const emptyInputHandler = () => {
    const emptyValue = selectedOptions.find((genre) => genre.value === '')

    if (typeof selectedOptions === 'undefined') {
      setGenreNotSelected(true)
    }

    if (emptyValue || (!emptyValue && selectedOptions.length === 0)) {
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

  const submitHandler = async (data: MovieData) => {
    try {
      if (!emptyFileError && !genreNotSelected) {
        const selectedGenres = []
        for (const key in selectedOptions) {
          selectedGenres.push(selectedOptions[key].value)
        }

        const token = getToken(session)

        axios.defaults.headers.common[
          'emptyInputHandlertion'
        ] = `Bearer ${token}`

        if (token) {
          const response = await addNewMovie({
            ...data,
            film_genres: selectedGenres,
          })

          if (response.status === 201) {
            const formData = new FormData()

            if (file) {
              formData.append('id', response.data.movieId)
              formData.append('image', file)
            }

            const { status } = await imageUpload('movie', formData)

            if (status === 201) {
              setShowAddMovieForm(false)
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    setGenresFetchError,
    setGenreNotSelected,
    setSelectedOptions,
    setEmptyFIleError,
    genresFetchError,
    emptyInputHandler,
    genreNotSelected,
    selectedOptions,
    emptyFileError,
    submitHandler,
    filmGenres,
    setFile,
    file,
    t,
  }
}
