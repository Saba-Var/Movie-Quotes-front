import { SetState } from 'types'

export type PopupProps = {
  setShowPopupModal: SetState<boolean>
  children?: JSX.Element
  setModal?: SetState<boolean>
  type: string
  info: string
}
