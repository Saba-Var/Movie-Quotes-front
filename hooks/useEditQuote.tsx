import { Quotes, SetState } from 'types'
import { useSockets } from 'hooks'

const useEditQuote = (quoteList: Quotes, setQuoteList: SetState<Quotes>) => {
  const { socket } = useSockets()

  return socket.off('SEND_EDITED_QUOTE').on('SEND_EDITED_QUOTE', (data) => {
    const existingQuote = quoteList.find((quote) => quote._id === data._id)

    if (existingQuote) {
      setQuoteList((prev) => {
        return prev.map((quote) => (quote._id === data._id ? data : quote))
      })
    }
  })
}

export default useEditQuote
