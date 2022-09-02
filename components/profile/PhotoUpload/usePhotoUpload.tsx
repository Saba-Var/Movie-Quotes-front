import { useTranslation } from 'next-i18next'
import { SetState } from 'types'

export const usePhotoUpload = (
  setFile: SetState<File | null>,
  setTypeError: SetState<boolean>,
  typeError: boolean
) => {
  const { t } = useTranslation()

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]?.type.includes('image/')) {
      setFile(e.target.files[0])
      if (typeError) {
        setTypeError(false)
      }
    } else {
      if (!typeError) {
        setTypeError(true)
      }
    }
  }

  return { t, fileChangeHandler }
}
