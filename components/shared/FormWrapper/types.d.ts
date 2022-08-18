import { SetState } from 'types'

export type FormWrapperProps = {
  setDeleteModal?: SetState<boolean>
  setShowForm: SetState<boolean>
  children: React.ReactNode
  disableOverflow?: boolean
  closeHandler?: () => void
  titleStyle?: string
  hideImage?: boolean
  styles?: string
  modal?: 'edit'
  title: string
}
