import { SelectedOptions, SetState } from 'types'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { getFilmGenres } from 'services'

export const useEditMovieInfo = (
  setShowEditForm: SetState<boolean>,
  userFilmGenres: string[]
) => {
  const [genresFetchError, setGenresFetchError] = useState(false)
  const [genreNotSelected, setGenreNotSelected] = useState(false)
  const [emptyFileError, setEmptyFIleError] = useState(false)
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
    emptyInputHandler,
    setEmptyFIleError,
    defaultSelection,
    genresFetchError,
    genreNotSelected,
    selectedOptions,
    emptyFileError,
    filmGenres,
    setFile,
    file,
    t,
  }
}
