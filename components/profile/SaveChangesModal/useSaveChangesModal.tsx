import { useTranslation } from 'next-i18next'
import { imageUpload } from 'services'
import { useSockets } from 'hooks'
import { SetState } from 'types'

export const useSaveChangesModal = (
  setFile: SetState<File | null> | undefined,
  file: File | null | undefined,
  userId: string | undefined,
  typeError: boolean | undefined,
  setTypeError: SetState<boolean> | undefined,
  setImageFetchError: SetState<boolean> | undefined
) => {
  const { socket } = useSockets()
  const { t } = useTranslation()

  const userImageUploadHandler = async () => {
    try {
      const formData = new FormData()
      formData.append('image', file!)
      formData.append('id', userId!)

      const response = await imageUpload('user', formData)

      if (response.status === 201) {
        socket.emit('UPLOAD_USER_IMAGE', response.data)

        setFile && setFile(null)

        if (typeError) {
          setTypeError && setTypeError(false)
        }
      }
    } catch (error) {
      setImageFetchError && setImageFetchError(true)
    }
  }

  return { t, userImageUploadHandler }
}
