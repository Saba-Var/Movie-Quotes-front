import { FilmGenres, Status, AllMovie } from 'types'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const getFilmGenres = (): Promise<AxiosResponse<FilmGenres>> => {
  return axios.get('/film-genres')
}

export const getAllMovies = (
  userId: string
): Promise<AxiosResponse<AllMovie>> => {
  return axios.get(`/all-movies?userId=${userId}`)
}

export const addNewMovie = (data: FormData): Promise<AxiosResponse<Status>> => {
  return axios.post('/add-movie', data)
}
