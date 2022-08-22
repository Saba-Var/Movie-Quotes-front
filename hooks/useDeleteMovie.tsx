import { Quotes, SetState } from 'types'
import { useSockets } from 'hooks'

const useDeleteMovie = (quoteList: Quotes, setQuoteList: SetState<Quotes>) => {
  const { socket } = useSockets()

  return socket
    .off('SEND_DELETED_MOVIE_ID')
    .on('SEND_DELETED_MOVIE_ID', (data) => {
      if (quoteList.length > 0) {
        setQuoteList((prev) => {
          return prev.filter((quote) => quote.movie._id !== data._id)
        })
      }
    })
}

export default useDeleteMovie
