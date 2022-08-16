const EVENTS = {
  movies: {
    on: {
      SEND_NEW_MOVIE_QUOTES: 'SEND_NEW_MOVIE_QUOTES',
      SEND_UPDATED_MOVIE: 'SEND_UPDATED_MOVIE',
      SEND_NEW_MOVIE: 'SEND_NEW_MOVIE',
    },

    emit: {
      DELETE_MOVIE_QUOTE: 'DELETE_MOVIE_QUOTE',
      UPDATE_MOVIE: 'UPDATE_MOVIE',
      ADD_MOVIE: 'ADD_MOVIE',
    },
  },
}

export default EVENTS
