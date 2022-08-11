const EVENTS = {
  connection: 'connection',

  movies: {
    on: {
      SEND_NEW_MOVIE: 'SEND_NEW_MOVIE',
      SEND_UPDATED_MOVIE: 'SEND_UPDATED_MOVIE',
    },

    emit: {
      ADD_MOVIE: 'ADD_MOVIE',
      UPDATE_MOVIE: 'UPDATE_MOVIE',
    },
  },
}

export default EVENTS
