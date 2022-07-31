import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useAuthFormWrapper = (modalName: string) => {
  const { t } = useTranslation()

  const [question, setQuestion] = useState('have-account')
  const [linkName, setLinkName] = useState('Log-in')

  if (modalName !== 'registration') {
    setQuestion("don't-have-account")
    setLinkName('SignUp')
  }

  return {
    question: t(`auth:${question}`),
    linkName: t(`common:${linkName}`),
  }
}
