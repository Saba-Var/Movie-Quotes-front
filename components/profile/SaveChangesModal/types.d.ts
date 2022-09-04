import { SetState } from 'types'

export type SaveChangesModalProps = {
  setImageUpdateAlert?: SetState<boolean>
  setImageFetchError?: SetState<boolean>
  setFile?: SetState<File | null>
  setTypeError?: SetState<boolean>
  closeModal?: SetState<boolean>
  typeError?: boolean
  file?: File | null
  userId?: string
}
