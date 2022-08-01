import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useLogIn = () => {
  const { t } = useTranslation()
  const [emailForm, setEmailForm] = useState(false)

  return { t, setEmailForm, emailForm }
}
