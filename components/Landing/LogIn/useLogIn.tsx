import { useTranslation } from 'next-i18next'

export const useLogIn = () => {
  const { t } = useTranslation()

  return { t }
}
