import { SetState } from 'types'

export type SetRegistrationModal = SetState<boolean>

export type setShowPopupModal = SetState<boolean>

export type RegistrationFormProps = {
  setRegistrationModal: SetState<boolean>
  setShowPopupModal: SetState<boolean>
}

export type FormData = {
  password: string
  email: string
  name: string
}
