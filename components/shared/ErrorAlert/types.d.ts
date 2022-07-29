import { SetState } from 'types'

export type SetShowAlert = SetState<boolean>

export type ErrorAlertProps = {
  setShowAlert: SetShowAlert
  styles?: string
  title: string
}
