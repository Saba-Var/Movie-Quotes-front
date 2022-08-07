import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { SelectedOptions } from './types.d'
import { getFilmGenres } from 'services'

export const useAddMovieForm = () => {
  const { t } = useTranslation()

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>([
    { value: '', label: '' },
  ])

  const [filmGenres, setFilmGenres] = useState([''])
  const [file, setFile] = useState<File | null>(null)

  const [genresFetchError, setGenresFetchError] = useState(false)
  const [emptyFileError, setEmptyFIleError] = useState(false)

  const emptyFileHandler = () => {
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
    setSelectedOptions,
    setEmptyFIleError,
    genresFetchError,
    emptyFileHandler,
    selectedOptions,
    emptyFileError,
    filmGenres,
    setFile,
    file,
    t,
  }
}
