import { getNewFeedQuotes } from 'services'
import { useEffect, useState } from 'react'
import { Quotes } from 'types'

export const useAllQuotes = () => {
  const [hasMoreQuotes, setHasMoreQuotes] = useState(false)

  const [quoteList, setQuoteList] = useState<Quotes>([])

  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await getNewFeedQuotes(page)

        if (response.status === 200) {
          const { data } = response

          if (data.paginationInfo) {
            const { paginationInfo } = data
            setHasMoreQuotes(paginationInfo.hasMoreQuotes)

            if (page === 1) {
              setQuoteList(data.quotes)
            } else {
              setQuoteList((prev) => [...prev, ...data.quotes])
            }
          }
        }
      } catch (error) {}
    }

    fetchQuotes()
  }, [page])

  return { setPage, page, hasMoreQuotes, quoteList }
}
