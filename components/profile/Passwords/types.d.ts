import { SetState } from 'types'

export type PasswordsProps = {
  setDisablePassword: SetState<boolean>
  lowerCaseError: string | undefined
  disablePassword: boolean
  passwordLength: number
  newPassword: string
}
