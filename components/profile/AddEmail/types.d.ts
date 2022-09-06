import { SetState, UpdatedList } from 'types'

export type AddEmailProps = {
  setUpdatedList: SetState<UpdatedList>
  setAddEmailModal: SetState<boolean>
  addEmailModal: boolean
  userId: string
}
