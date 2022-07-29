import { SetState } from 'types'

type SetStateBoolean = SetState<boolean>

export type SetRegistrationModal = SetStateBoolean

export type setShowPopupModal = SetStateBoolean

export type RegistrationFormProps = {
  setRegistrationModal: SetStateBoolean
  setShowPopupModal: SetStateBoolean
}

export type FormData = {
  password: string
  email: string
  name: string
}
