import { SetState } from 'types'

export type SetShowAlert = SetState<boolean>

export type ErrorAlertProps = {
  setShowAlert: SetShowAlert
  animate?: boolean
  styles?: string
  title: string
}
