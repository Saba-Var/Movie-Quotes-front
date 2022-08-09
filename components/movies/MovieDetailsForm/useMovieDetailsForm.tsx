import { useRouter } from 'next/router'

export const useMovieDetailsForm = () => {
  const locale = useRouter().locale

  return { locale }
}
