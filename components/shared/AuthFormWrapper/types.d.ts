import { SetState } from 'types'

export type FormWrapperProps = {
  setCloseModal: SetState<boolean>
  children: JSX.Element
  onClick: () => void
  instruction: string
  modalName: string
  title: string
}
