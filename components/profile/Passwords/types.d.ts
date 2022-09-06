import { SetState } from 'types'

export type PasswordsProps = {
  setDisablePassword: SetState<boolean>
  lowerCaseError: string | undefined
  disablePassword: boolean
  newPassword: string
}
