import { useRouter } from 'next/router'
import { SelectedOptions } from 'types'
import { useEffect, useState } from 'react'
import { getFilmGenres } from 'services'
import { useTranslation } from 'next-i18next'

export const useMovieInfo = (userFilmGenres: string[]) => {
  const locale = useRouter().locale

  const { t } = useTranslation()

  const defaultSelection: {}[] = []

  userFilmGenres.forEach((element) => {
    defaultSelection.push({ value: element, label: t(`movies:${element}`) })
  })

  const [filmGenres, setFilmGenres] = useState([''])
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    const fetchFilmGenres = async () => {
      try {
        const { data, status } = await getFilmGenres()

        if (status === 200) {
          setFilmGenres(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchFilmGenres()
  }, [])

  const options = [{}]

  filmGenres.forEach((genre) => {
    options.push({ value: genre, label: t(`movies:${genre}`) })
  })

  options.shift()

  const [disableInputs, setDisableInputs] = useState(true)
  const [genresNotSelected, setGenreNotSelected] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>([
    { value: '', label: '' },
  ])

  return {
    setGenreNotSelected,
    setSelectedOptions,
    genresNotSelected,
    setDisableInputs,
    defaultSelection,
    setDeleteModal,
    disableInputs,
    deleteModal,
    filmGenres,
    locale,
    t,
  }
}
