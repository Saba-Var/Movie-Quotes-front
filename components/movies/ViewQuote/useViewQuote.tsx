import { useTranslation } from 'next-i18next'
import { useQuoteList } from 'components'

export const useViewQuote = (quoteId: string) => {
  const { quoteList } = useQuoteList()
  const { t } = useTranslation()

  const currentQuote = quoteList.find((quote) => quote._id === quoteId)

  const quoteImageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${currentQuote?.image}`

  return { currentQuote, t, quoteImageSrc }
}
