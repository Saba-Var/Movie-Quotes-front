const EVENTS = {
  connection: 'connection',

  movies: {
    on: {
      SEND_NEW_MOVIE: 'SEND_NEW_MOVIE',
    },

    emit: {
      ADD_MOVIE: 'ADD_MOVIE',
    },
  },
}

export default EVENTS
