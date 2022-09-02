import { SetState } from 'types'

export type PhotoUploadProps = {
  userImageSrc: string | undefined
  setTypeError: SetState<boolean>
  setFile: SetState<File | null>
  typeError: boolean
  file: File | null
  userName: string
}
