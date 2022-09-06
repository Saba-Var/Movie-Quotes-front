import { SetState, UpdatedList } from 'types'

export type SaveChangesModalProps = {
  setPasswordErrorAlert?: SetState<boolean>
  setUpdatedList?: SetState<UpdatedList>
  setImageFetchError?: SetState<boolean>
  setFile?: SetState<File | null>
  setTypeError?: SetState<boolean>
  closeModal?: SetState<boolean>
  passwordErrorAlert?: boolean
  saveHandler?: () => void
  typeError?: boolean
  file?: File | null
  styles?: string
  userId?: string
}
