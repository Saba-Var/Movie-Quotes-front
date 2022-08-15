import { SetState } from 'types'

export type FormWrapperProps = {
  setShowForm: SetState<boolean>
  children: React.ReactNode
  disableOverflow?: boolean
  closeHandler?: () => void
  titleStyle?: string
  hideImage?: boolean
  styles?: string
  title: string
}
