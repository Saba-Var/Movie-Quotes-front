import { SetState } from 'types'

export type FormWrapperProps = {
  setShowForm: SetState<boolean>
  children: React.ReactNode
  titleStyle?: string
  hideImage?: boolean
  styles?: string
  title: string
}
