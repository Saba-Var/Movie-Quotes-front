import { Quotes, SetState } from 'types'
import { quoteSetter } from 'helpers'
import { useSockets } from 'hooks'

const useLikeQuote = (quoteList: Quotes, setQuoteList: SetState<Quotes>) => {
  const { socket } = useSockets()

  return socket.on('SEND_NEW_LIKE', (likeId, quoteId) => {
    const currentQuote = quoteList.find((quote) => quote._id === quoteId)

    if (currentQuote && !currentQuote.likes.includes(likeId)) {
      currentQuote.likes.push(likeId)
      quoteSetter(currentQuote, setQuoteList)
    }
  })
}

export default useLikeQuote
