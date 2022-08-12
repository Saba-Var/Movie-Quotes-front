import { SetState } from 'types'

export type DeleteDialogWrapperProps = {
  setDeleteDialogWrapper: SetState<boolean>
  children: JSX.Element
  question: string
  title: string
}
