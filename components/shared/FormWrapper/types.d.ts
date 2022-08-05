import { SetState } from 'types'

export type FormWrapperProps = {
  setShowForm: SetState<boolean>
  children: React.ReactNode
  title: string
}
