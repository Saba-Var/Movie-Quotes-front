import { SetState } from 'types'

export type ImageDragAndDropProps = {
  setFile: SetState<File | null>
  file: File | null
}
