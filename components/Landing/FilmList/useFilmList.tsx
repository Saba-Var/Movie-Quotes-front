import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const useFilmList = () => {
  const { t } = useTranslation()
  const locale = useRouter().locale

  return {
    locale,
    t,
  }
}
