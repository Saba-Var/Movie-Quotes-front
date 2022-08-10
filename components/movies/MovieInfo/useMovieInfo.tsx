import { getFilmGenres, deleteMovie } from 'services'
import Router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { SelectedOptions } from 'types'

export const useMovieInfo = (userFilmGenres: string[]) => {
  const [genresNotSelected, setGenreNotSelected] = useState(false)
  const [disableInputs, setDisableInputs] = useState(true)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const [filmGenres, setFilmGenres] = useState([''])
  const locale = useRouter().locale
  const { t } = useTranslation()
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>([
    { value: '', label: '' },
  ])

  const defaultSelection: {}[] = []
  userFilmGenres.forEach((element) => {
    defaultSelection.push({ value: element, label: t(`movies:${element}`) })
  })

  useEffect(() => {
    const fetchFilmGenres = async () => {
      try {
        const { data, status } = await getFilmGenres()

        if (status === 200) {
          setFilmGenres(data)
        }
      } catch (error) {}
    }

    fetchFilmGenres()
  }, [])

  const options = [{}]
  filmGenres.forEach((genre) => {
    options.push({ value: genre, label: t(`movies:${genre}`) })
  })
  options.shift()

  const movieDeleteHandler = async (id: string) => {
    try {
      const { status } = await deleteMovie(id)

      if (status === 200) {
        Router.push(`/${locale}/movies`)
      }
    } catch (error) {
      setDeleteError(true)
    }
  }

  return {
    setGenreNotSelected,
    movieDeleteHandler,
    setSelectedOptions,
    genresNotSelected,
    setDisableInputs,
    defaultSelection,
    setDeleteModal,
    setDeleteError,
    disableInputs,
    deleteError,
    deleteModal,
    filmGenres,
    locale,
    t,
  }
}
