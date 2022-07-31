import { SetState } from 'types'

export type FormModalWrapperProps = {
  children: JSX.Element
  setCloseModal: SetState<boolean>
}
