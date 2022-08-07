import { SetState, SelectedOptions } from 'types'
import { FilmGenres } from 'types'

export type GenresMultiSelectProps = {
  setSelectedOptions: SetState<SelectedOptions>
  setGenreNotSelected: SetState<boolean>
  genreNotSelected: boolean
  filmGenres: FilmGenres
}
