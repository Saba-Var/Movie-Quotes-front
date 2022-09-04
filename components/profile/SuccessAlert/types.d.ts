import { SetState } from 'types'

export type SuccessAlertProps = {
  setSuccessAlert: SetState<boolean>
  instructions?: string
  headerText: string
}
