import { SetState } from 'types'

export type ImageDragAndDropProps = {
  setEmptyFIleError: SetState<boolean>
  setFile: SetState<File | null>
  emptyFileError: boolean
  file: File | null
}
