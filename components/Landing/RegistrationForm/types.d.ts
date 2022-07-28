import { Dispatch, SetStateAction } from 'react'

export type SetRegistrationModal = Dispatch<SetStateAction<boolean>>

export type RegistrationFormProps = {
  setRegistrationModal: SetRegistrationModal
}

export type FormData = {
  password: string
  email: string
  name: string
}
