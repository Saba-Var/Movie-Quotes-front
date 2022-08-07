import { AxiosResponse } from 'axios'
import { FilmGenres } from 'types'
import axios from 'services'

export const getFilmGenres = (): Promise<AxiosResponse<FilmGenres>> => {
  return axios.get('/film-genres')
}
