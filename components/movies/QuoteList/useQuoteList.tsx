import { useTranslation } from 'next-i18next'
import { getMovieQuotes } from 'services'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Quotes } from 'types'

export const useQuoteList = () => {
  const [quoteList, setQuoteList] = useState<Quotes | null>(null)

  const { query, locale } = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        if (typeof query.id === 'string') {
          const response = await getMovieQuotes(query.id!)
          setQuoteList(response.data)
        }
      } catch (error) {}
    }

    fetchQuotes()
  }, [query.id])

  return { t, quoteList, locale }
}
