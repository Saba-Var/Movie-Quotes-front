import { useRouter } from 'next/router'

export const useAddButton = () => {
  const locale = useRouter().locale

  return { locale }
}
