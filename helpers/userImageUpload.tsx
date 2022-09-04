import { SetState, UpdatedList } from 'types'
import { Socket } from 'socket.io-client'
import { imageUpload } from 'services'

const userImageUpload = async (
  socket: Socket,
  file: File,
  setFile: SetState<File | null>,
  userId: string,
  disableInput: boolean,
  setDisableInput: SetState<boolean>,
  typeError: boolean,
  setTypeError: SetState<boolean>,
  setImageFetchError: SetState<boolean>,
  setUpdatedList?: SetState<UpdatedList>
) => {
  try {
    const formData = new FormData()
    formData.append('image', file!)
    formData.append('id', userId)

    const response = await imageUpload('user', formData)

    if (response.status === 201) {
      socket.emit('UPLOAD_USER_IMAGE', response.data)

      if (setUpdatedList) {
        setUpdatedList((prev) => [
          { id: new Date().toISOString(), type: 'image-updated' },
          ...prev,
        ])
      }

      if (disableInput) {
        setDisableInput(true)
      }

      setFile(null)
      if (typeError) {
        setTypeError(false)
      }
    }
  } catch (error) {
    setImageFetchError(true)
  }
}

export default userImageUpload
