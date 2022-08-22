import { useTranslation } from 'next-i18next'

export const useSearchedPosts = () => {
  const { t } = useTranslation()

  return { t }
}
