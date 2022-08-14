import { SetState } from 'types'

export type FormWrapperProps = {
  setEmptyFIleError?: SetState<boolean>
  setSelectedMovieId?: SetState<string>
  setMovieIdError?: SetState<boolean>
  setFile?: SetState<File | null>
  setShowForm: SetState<boolean>
  children: React.ReactNode
  disableOverflow?: boolean
  titleStyle?: string
  hideImage?: boolean
  styles?: string
  title: string
}
