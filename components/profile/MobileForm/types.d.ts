import { SetState } from 'types'

export type MobileFormProps = {
  setFieldValue: (field: string, value: string) => void
  type: 'username' | 'password' | 'email'
  setUpdateAlert: SetState<boolean>
  setFile: SetState<File | null>
  closeForm: SetState<boolean>
  file: File | null
  userId: string
}
