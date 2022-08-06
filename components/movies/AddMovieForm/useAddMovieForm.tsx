import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const useAddMovieForm = () => {
  const { t } = useTranslation()

  const [file, setFile] = useState<File | null>(null)

  return { t, file, setFile }
}
