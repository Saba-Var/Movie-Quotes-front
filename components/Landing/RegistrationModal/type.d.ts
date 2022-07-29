import { SetState } from 'types'

type SetStateBoolean = SetState<boolean>

export type RegistrationModalProps = {
  setRegistrationModal: SetState
  setShowPopupModal: SetState
}
