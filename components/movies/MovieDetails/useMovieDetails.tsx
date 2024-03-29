import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AllMovie } from 'types'

export const useMovieDetails = (movieList: AllMovie) => {
  const [addQuoteModal, setAddQuoteModal] = useState(false)

  const { t } = useTranslation()
  const router = useRouter()

  const currentMovie = movieList.find((movie) => movie._id === router.query.id)

  if (!currentMovie) {
    router.push(`/${router.locale}/not-found`)
  }

  const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${currentMovie?.image}`

  return { currentMovie, imageSrc, t, addQuoteModal, setAddQuoteModal }
}
