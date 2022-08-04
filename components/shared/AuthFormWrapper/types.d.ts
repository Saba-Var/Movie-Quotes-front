import { SetState } from 'types'

export type FormWrapperProps = {
  setCloseModal: SetState<boolean>
  children: React.ReactNode
  onClick: () => void
  instruction: string
  modalName: string
  title: string
}
