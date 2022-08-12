import { SetState } from 'types'

export { CertainMovieDetails } from 'types'

export type EditMovieInfoProps = {
  setShowEditForm: SetState<boolean>
  currentMovie: CertainMovieDetails
}
