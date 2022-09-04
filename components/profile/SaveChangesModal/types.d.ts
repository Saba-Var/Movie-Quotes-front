import { SetState, UpdatedList } from 'types'

export type SaveChangesModalProps = {
  setUpdatedList?: SetState<UpdatedList>
  setImageFetchError?: SetState<boolean>
  setFile?: SetState<File | null>
  setTypeError?: SetState<boolean>
  closeModal?: SetState<boolean>
  typeError?: boolean
  file?: File | null
  userId?: string
}
