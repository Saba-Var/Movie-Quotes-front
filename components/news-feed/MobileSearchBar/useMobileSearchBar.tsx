import { useTranslation } from 'next-i18next'

export const useMobileSearchBar = () => {
  const { t } = useTranslation()

  return { t }
}
