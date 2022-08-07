import { FilmGenres } from 'types'
import { SetState } from 'types'

export type GenresMultiSelectProps = {
  setSelectedOptions: SetState<unknown | {}[]>
  filmGenres: FilmGenres
}
