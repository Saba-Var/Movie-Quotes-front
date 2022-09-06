import { SetState, UpdatedList } from 'types'

export type SuccessAlertProps = {
  setUpdatedList: SetState<UpdatedList>
  instructions?: string
  headerText: string
  id: string
}
