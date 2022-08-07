import { useTranslation } from 'next-i18next'
import { FilmGenres } from 'types'

export const useGenresMultiSelect = (filmGenres: FilmGenres) => {
  const { t } = useTranslation()

  const options = [{}]

  filmGenres.forEach((genre) => {
    options.push({ value: genre, label: genre })
  })

  options.shift()

  return { options, t }
}
