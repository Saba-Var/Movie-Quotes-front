import { SetState } from 'types'

export type ChangePasswordFormProps = {
  setShowLogIn: SetState<boolean>
}

export type FormData = {
  password: string
  confirmPassword: string
}
