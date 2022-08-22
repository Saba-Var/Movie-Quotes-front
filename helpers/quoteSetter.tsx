import { Quote, SetState, Quotes } from 'types'

const quoteSetter = (currentQuote: Quote, setQuoteList: SetState<Quotes>) => {
  setQuoteList((prev) => {
    return prev.map((quote) =>
      quote._id === currentQuote?._id ? currentQuote : quote
    )
  })
}

export default quoteSetter
