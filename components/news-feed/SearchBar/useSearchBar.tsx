import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useSearchBar = () => {
  const [costumePlaceholder, setCustomPlaceholder] = useState(false)

  const { locale } = useRouter()
  const { t } = useTranslation()

  const georgianLan = locale === 'ge'

  return { t, georgianLan, costumePlaceholder, setCustomPlaceholder }
}
