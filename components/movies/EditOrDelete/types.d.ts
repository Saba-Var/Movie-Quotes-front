import { SetState } from 'types'

export type EditOrDeleteProps = {
  setDisabledInputs: SetState<boolean>
  deleteHandler: () => void
}
