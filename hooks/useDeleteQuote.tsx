import { Quotes, SetState } from 'types'
import { useSockets } from 'hooks'

const useDeleteQuote = (quoteList: Quotes, setQuoteList: SetState<Quotes>) => {
  const { socket } = useSockets()

  return socket
    .off('SEND_NEW_MOVIE_QUOTES')
    .on('SEND_NEW_MOVIE_QUOTES', (deletedQuoteId) => {
      const existingQuote = quoteList.find(
        (quote) => quote._id === deletedQuoteId
      )

      if (existingQuote) {
        setQuoteList((prev) => {
          return prev.filter((quote) => quote._id !== deletedQuoteId)
        })
      }
    })
}

export default useDeleteQuote
