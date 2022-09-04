import { SetState } from 'types'

export type MobileFormProps = {
  setFieldValue: (field: string, value: string) => void
  type: 'username' | 'password' | 'email'
  closeForm: SetState<boolean>
  userId: string
}
