import { SetState } from 'types'

export type MovieMultiSelectProps = {
  setSelectedMovieId: SetState<string>
  setMovieIdError: SetState<boolean>
  movieIdError: boolean
}
