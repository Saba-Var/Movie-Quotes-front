import { SetState, SelectedOptions } from 'types'
import { FilmGenres } from 'types'

export type GenresMultiSelectProps = {
  setSelectedOptions: SetState<unknown | SelectedOptions>
  filmGenres: FilmGenres
}
