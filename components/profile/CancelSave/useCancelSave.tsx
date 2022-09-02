import { useTranslation } from 'next-i18next'

export const useCancelSave = () => {
  const { t } = useTranslation()

  return { t }
}
