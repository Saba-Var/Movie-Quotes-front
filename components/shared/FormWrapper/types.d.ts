import { SetState } from 'types'

export type FormWrapperProps = {
  setShowForm: SetState<boolean>
  children: React.ReactNode
  hideImage?: boolean
  title: string
  top?: string
}
