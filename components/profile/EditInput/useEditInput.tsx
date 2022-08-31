import { useRouter } from 'next/router'

export const useEditInput = () => {
  const { locale } = useRouter()

  return { locale }
}
