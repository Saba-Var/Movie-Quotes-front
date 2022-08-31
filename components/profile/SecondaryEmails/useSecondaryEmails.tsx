import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useSecondaryEmails = () => {
  const [tooltip, setTooltip] = useState(false)

  const { t } = useTranslation()

  return { t, tooltip, setTooltip }
}
