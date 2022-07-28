import { Dispatch, SetStateAction } from 'react'

export type SetShowAlert = Dispatch<SetStateAction<boolean>>

export type ErrorAlertProps = {
  setShowAlert: SetShowAlert
  styles?: string
  title: string
}
