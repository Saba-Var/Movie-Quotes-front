import { SetState } from 'types'

export type AddEmailProps = {
  setAddEmailModal: SetState<boolean>
  addEmailModal: boolean
  userId: string
}
