import { Dispatch, SetStateAction } from 'react'

type SetState = Dispatch<SetStateAction<boolean>>

export type RegistrationModalProps = {
  setRegistrationModal: SetState
  setShowPopupModal: SetState
}
