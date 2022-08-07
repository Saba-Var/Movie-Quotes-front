import { useTranslation } from 'next-i18next'
import { FilmGenres } from 'types'

export const useGenresMultiSelect = (filmGenres: FilmGenres) => {
  const { t } = useTranslation()

  const options = [{}]

  filmGenres.forEach((genre) => {
    options.push({ value: genre, label: t(`movies:${genre}`) })
  })

  options.shift()

  const whiteTextStyle = (styles: {}) => {
    return {
      ...styles,
      color: '#ffffff',
    }
  }

  return { options, t, whiteTextStyle }
}
