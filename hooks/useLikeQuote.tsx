import { Quotes, SetState } from 'types'
import { quoteSetter } from 'helpers'
import { useSockets } from 'hooks'
import { useEffect } from 'react'

const useLikeQuote = (quoteList: Quotes, setQuoteList: SetState<Quotes>) => {
  const { socket } = useSockets()

  return useEffect(() => {
    socket.on('SEND_NEW_LIKE', (likeId, quoteId) => {
      if (quoteList) {
        const currentQuote = quoteList.find((quote) => quote._id === quoteId)

        if (currentQuote && !currentQuote.likes.includes(likeId)) {
          currentQuote.likes.push(likeId)
          quoteSetter(currentQuote, setQuoteList)
          setQuoteList((prev) => {
            return prev.map((quote) =>
              quote._id === currentQuote?._id ? currentQuote : quote
            )
          })
        }
      }
    })
  }, [quoteList, setQuoteList, socket])
}

export default useLikeQuote
