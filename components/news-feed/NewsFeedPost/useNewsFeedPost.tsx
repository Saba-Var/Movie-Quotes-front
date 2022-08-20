import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const useNewsFeedPost = (movieImageUri: string) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${movieImageUri}`

  return { locale, imageSrc, t }
}
