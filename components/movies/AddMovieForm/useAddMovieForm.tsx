import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { getFilmGenres } from 'services'
import { SelectedOptions } from 'types'

export const useAddMovieForm = () => {
  const { t } = useTranslation()

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
    filmGenres,
    setFile,
    file,
    t,
  }
}
