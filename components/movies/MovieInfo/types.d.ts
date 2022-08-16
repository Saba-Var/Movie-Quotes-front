export { CertainMovieDetails, SetState } from 'types'

export type MovieDetailsProps = {
  setAddQuoteModal: SetState<boolean>
  currentMovie: CertainMovieDetails
}
