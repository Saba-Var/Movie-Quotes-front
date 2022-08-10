import { SetState } from 'types'

export type MoviesFormInputsProp = {
  setEmptyFIleError: SetState<boolean>
  setFile: SetState<File | null>
  emptyInputHandler: () => void
  emptyFileError: boolean
  children: JSX.Element
  buttonTitle: string
  file: File | null
}
