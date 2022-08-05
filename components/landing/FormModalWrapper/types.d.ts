import { SetState } from 'types'

export type FormModalWrapperProps = {
  setCloseModal: SetState<boolean>
  children: React.ReactNode
  styles?: string
  top?: string
}
