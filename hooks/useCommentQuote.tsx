import { Quotes, SetState } from 'types'
import { quoteSetter } from 'helpers'
import { useSockets } from 'hooks'
import { useEffect } from 'react'

const useCommentQuote = (quoteList: Quotes, setQuoteList: SetState<Quotes>) => {
  const { socket } = useSockets()

  return useEffect(() => {
    socket
      .off('SEND_NEW_COMMENT')
      .on('SEND_NEW_COMMENT', (comment, quoteId) => {
        const currentQuote = quoteList.find((quote) => quote._id === quoteId)

        if (currentQuote) {
          const existingComment = currentQuote.comments.find(
            (currentComment) => currentComment._id === comment._id
          )

          if (!existingComment) {
            currentQuote.comments.unshift(comment)
            quoteSetter(currentQuote, setQuoteList)
          }
        }
      })
  }, [quoteList, setQuoteList, socket])
}

export default useCommentQuote
