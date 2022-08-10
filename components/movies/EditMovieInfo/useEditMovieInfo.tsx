import axios, { getFilmGenres, changeMovie } from 'services'
import { SelectedOptions, SetState } from 'types'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import getToken from 'helpers/getToken'
import { MovieFormData } from 'types'

export const useEditMovieInfo = (
  setShowEditForm: SetState<boolean>,
  userFilmGenres: string[]
) => {
  const [genresFetchError, setGenresFetchError] = useState(false)
  const [genreNotSelected, setGenreNotSelected] = useState(false)
  const [movieEditFailed, setMovieEditFailed] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [filmGenres, setFilmGenres] = useState([''])
  const { t } = useTranslation()
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>([
    { value: '', label: '' },
  ])

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
        formData.append('movie_description_en', data.movie_description_en)
        formData.append('movie_description_ge', data.movie_description_ge)
        formData.append('movie_name_en', data.movie_name_en)
        formData.append('movie_name_ge', data.movie_name_ge)
        formData.append('director_en', data.director_en)
        formData.append('director_ge', data.director_ge)
        formData.append('budget', data.budget)
        if (file) {
          formData.append('image', file)
        }
        formData.append('id', id)
        for (const genre of selectedGenres) {
          formData.append('film_genres', genre)
        }

        const { status } = await changeMovie(formData)

        if (status === 200) {
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

  return {
    setGenresFetchError,
    setGenreNotSelected,
    setSelectedOptions,
    setMovieEditFailed,
    emptyInputHandler,
    defaultSelection,
    genresFetchError,
    genreNotSelected,
    movieEditFailed,
    submitHandler,
    filmGenres,
    setFile,
    file,
    t,
  }
}
