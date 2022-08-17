import { likeQuote } from 'services'
import { useSockets } from 'hooks'
import { EVENTS } from 'helpers'

export const useQuoteLike = () => {
  const { socket } = useSockets()

  const likeHandler = async (quoteId: string, userId: string) => {
    try {
      const response = await likeQuote(quoteId, userId)

      if (response.status === 200) {
        socket.emit(EVENTS.movies.emit.LIKE_QUOTE, response.data, quoteId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { likeHandler }
}
