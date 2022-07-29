import { Dispatch, SetStateAction } from 'react'

type SetState = Dispatch<SetStateAction<boolean>>

export type SetRegistrationModal = SetState

export type setShowPopupModal = SetState

export type RegistrationFormProps = {
  setRegistrationModal: SetState
  setShowPopupModal: SetState
}

export type FormData = {
  password: string
  email: string
  name: string
}
