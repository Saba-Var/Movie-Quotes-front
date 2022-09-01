import { SetState } from 'types'

export type VerificationAlertProps = {
  setVerificationAlert: SetState<boolean>
  instructions?: string
  headerText: string
}
