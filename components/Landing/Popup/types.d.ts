import { SetState } from 'types'

export type PopupProps = {
  setShowPopupModal: SetState<boolean>
  loginButtonAction?: () => void
  setModal?: SetState<boolean>
  children?: React.ReactNode
  loginButton?: boolean
  buttonTitle: string
  title: string
  type: string
  info: string
}
