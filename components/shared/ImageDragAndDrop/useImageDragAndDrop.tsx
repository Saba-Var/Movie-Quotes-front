import { useTranslation } from 'next-i18next'

export const useImageDragAndDrop = () => {
  const { t } = useTranslation()

  return {
    t,
  }
}
