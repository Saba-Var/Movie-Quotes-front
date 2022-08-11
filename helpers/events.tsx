const EVENTS = {
  movies: {
    on: {
      SEND_UPDATED_MOVIE: 'SEND_UPDATED_MOVIE',
      SEND_NEW_MOVIE: 'SEND_NEW_MOVIE',
    },

    emit: {
      UPDATE_MOVIE: 'UPDATE_MOVIE',
      ADD_MOVIE: 'ADD_MOVIE',
    },
  },
}

export default EVENTS
