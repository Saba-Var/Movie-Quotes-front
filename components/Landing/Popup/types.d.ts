import { SetState } from 'types'

export type PopupProps = {
  setShowPopupModal: SetState<boolean>
  loginButtonAction?: () => void
  setModal?: SetState<boolean>
  children?: JSX.Element
  loginButton?: boolean
  buttonTitle: string
  title: string
  type: string
  info: string
}
