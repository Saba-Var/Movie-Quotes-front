import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SetState } from 'types'
import { useState } from 'react'

export const useSearchBar = (
  setInputValue: SetState<string>,
  inputValue: string
) => {
  const [costumePlaceholder, setCustomPlaceholder] = useState(false)

  const { locale } = useRouter()
  const { t } = useTranslation()

  const georgianLan = locale === 'ge'

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return {
    setCustomPlaceholder,
    costumePlaceholder,
    changeHandler,
    georgianLan,
    inputValue,
    t,
  }
}
