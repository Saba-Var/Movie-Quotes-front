import { FilmGenres, Status } from 'types'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const getFilmGenres = (): Promise<AxiosResponse<FilmGenres>> => {
  return axios.get('/film-genres')
}

export const addNewMovie = (data: FormData): Promise<AxiosResponse<Status>> => {
  return axios.post('/add-movie', data)
}
