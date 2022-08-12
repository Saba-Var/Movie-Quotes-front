import axios, { getMovieGenres, changeMovie } from 'services'
import { SelectedOptions, SetState } from 'types'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import getToken from 'helpers/getToken'
import { MovieFormData } from 'types'
import { useSockets } from 'hooks'
import { EVENTS } from 'helpers'

export const useEditMovieInfo = (
  setShowEditForm: SetState<boolean>,
  userFilmGenres: string[]
) => {
  const [genresFetchError, setGenresFetchError] = useState(false)
  const [genreNotSelected, setGenreNotSelected] = useState(false)
  const [movieEditFailed, setMovieEditFailed] = useState(false)
  const [emptyFileError, setEmptyFIleError] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [filmGenres, setFilmGenres] = useState([''])
  const { t } = useTranslation()
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>([
    { value: '', label: '' },
  ])

  const { socket } = useSockets()

  useEffect(() => {
    const selectedGenres = [{ value: '', label: '' }]
    userFilmGenres.forEach((el) =>
      selectedGenres.push({ value: el, label: t(`movies:${el}`) })
    )
    selectedGenres.shift()
    setSelectedOptions(selectedGenres)
  }, [filmGenres, t, userFilmGenres])

  const defaultSelection: {}[] = []
  userFilmGenres.forEach((element) => {
    defaultSelection.push({ value: element, label: t(`movies:${element}`) })
  })

  const options = [{}]
  filmGenres.forEach((genre) => {
    options.push({ value: genre, label: t(`movies:${genre}`) })
  })
  options.shift()

  const emptyInputHandler = () => {
    const emptyValue = selectedOptions.find((genre) => genre.value === '')
    if (
      emptyValue ||
      (!emptyValue && selectedOptions.length === 0) ||
      typeof selectedOptions === 'undefined'
    ) {
      setGenreNotSelected(true)
    }
  }

  const { data: session } = useSession()

  const submitHandler = async (
    data: MovieFormData,
    id: string,
    setShowEditForm: SetState<boolean>
  ) => {
    try {
      if (!genreNotSelected) {
        const selectedGenres = []
        for (const key in selectedOptions) {
          selectedGenres.push(selectedOptions[key].value)
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${getToken(
          session
        )}`

        const formData = new FormData()
        formData.append('movieDescriptionEn', data.movieDescriptionEn)
        formData.append('movieDescriptionGe', data.movieDescriptionGe)
        formData.append('movieNameEn', data.movieNameEn)
        formData.append('movieNameGe', data.movieNameGe)
        formData.append('directorEn', data.directorEn)
        formData.append('directorGe', data.directorGe)
        formData.append('budget', data.budget)
        if (file) {
          formData.append('image', file)
        }
        formData.append('id', id)

        if (selectedGenres.length === 1) {
          formData.append('movieGenres[]', selectedGenres[0])
        } else {
          for (const genre of selectedGenres) {
            formData.append('movieGenres', genre)
          }
        }

        const response = await changeMovie(formData)

        if (response.status === 200) {
          socket.emit(EVENTS.movies.emit.UPDATE_MOVIE, response.data)
          setShowEditForm(false)
        }
      }
    } catch (error) {
      setMovieEditFailed(true)
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

  return {
    setGenresFetchError,
    setGenreNotSelected,
    setSelectedOptions,
    setMovieEditFailed,
    emptyInputHandler,
    setEmptyFIleError,
    defaultSelection,
    genresFetchError,
    genreNotSelected,
    movieEditFailed,
    emptyFileError,
    submitHandler,
    filmGenres,
    setFile,
    file,
    t,
  }
}
