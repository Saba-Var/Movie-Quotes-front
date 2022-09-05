import { SetState, UpdatedList } from 'types'

export type SaveChangesModalProps = {
  setPasswordErrorAlert?: SetState<boolean>
  setUpdatedList?: SetState<UpdatedList>
  setImageFetchError?: SetState<boolean>
  setFile?: SetState<File | null>
  setTypeError?: SetState<boolean>
  closeModal?: SetState<boolean>
  passwordErrorAlert?: boolean
  typeError?: boolean
  file?: File | null
  userId?: string
}
