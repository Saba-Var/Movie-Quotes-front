import { SetState } from 'types'

export type PhotoUploadProps = {
  userImageSrc: string | undefined
  setFile: SetState<File | null>
  file: File | null
  userName: string
}
