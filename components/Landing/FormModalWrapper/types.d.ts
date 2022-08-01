import { SetState } from 'types'

export type FormModalWrapperProps = {
  setCloseModal: SetState<boolean>
  children: JSX.Element
  styles?: string
  top?: string
}
