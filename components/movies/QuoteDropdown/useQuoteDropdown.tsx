import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useQuoteDropdown = () => {
  const [showDropDown, setShowDropDown] = useState(false)

  const { t } = useTranslation()

  return { t, showDropDown, setShowDropDown }
}
