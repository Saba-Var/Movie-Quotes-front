import { useTranslation } from 'next-i18next'

export const usePasswordRequirements = (
  newPassword: string,
  lowerCaseError: string | undefined
) => {
  const { t } = useTranslation()

  const passwordSecondCondition =
    newPassword !== '' &&
    newPassword.length <= 15 &&
    lowerCaseError !== 'lower-required'

  return { t, passwordSecondCondition }
}
