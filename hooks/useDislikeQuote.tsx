import { Quotes, SetState } from 'types'
import { quoteSetter } from 'helpers'
import { useSockets } from 'hooks'

const useDislikeQuote = (quoteList: Quotes, setQuoteList: SetState<Quotes>) => {
  const { socket } = useSockets()

  return socket.on('SEND_DISLIKE_QUOTE', (dislikeUser, quoteId) => {
    let currentQuote = quoteList.find((quote) => quote._id === quoteId)

    if (currentQuote && currentQuote.likes.includes(dislikeUser)) {
      currentQuote.likes = currentQuote.likes.filter((like) => {
        return like !== dislikeUser
      })

      quoteSetter(currentQuote, setQuoteList)
    }
  })
}

export default useDislikeQuote
