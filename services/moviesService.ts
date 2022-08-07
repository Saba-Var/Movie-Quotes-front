import { FilmGenres, MovieData } from 'types'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const getFilmGenres = (): Promise<AxiosResponse<FilmGenres>> => {
  return axios.get('/film-genres')
}

export const addNewMovie = (
  data: MovieData
): Promise<AxiosResponse<{ movieId: string }>> => {
  return axios.post('/add-movie', data)
}
