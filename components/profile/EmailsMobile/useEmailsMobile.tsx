import { useTranslation } from 'next-i18next'

export const useEmailsMobile = () => {
  const { t } = useTranslation()

  return { t }
}
