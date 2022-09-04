import { SetState } from 'types'

export type SaveChangesModalProps = {
  setImageFetchError?: SetState<boolean>
  setFile?: SetState<File | null>
  setTypeError?: SetState<boolean>
  closeModal?: SetState<boolean>
  typeError?: boolean
  file?: File | null
  userId?: string
}
