import { SetState, UpdatedList } from 'types'

export type MobileFormProps = {
  setFieldValue?: (field: string, value: string) => void
  type: 'username' | 'password' | 'email'
  setUpdateList: SetState<UpdatedList>
  setFile?: SetState<File | null>
  closeForm: SetState<boolean>
  file?: File | null
  userId: string
}
