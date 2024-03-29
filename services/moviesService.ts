import { FilmGenres, Status, AllMovie } from 'types'
import { DeletedMovieId } from './types.d'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const getMovieGenres = (): Promise<AxiosResponse<FilmGenres>> => {
  return axios.get('/movie-genres')
}

export const getAllMovies = (
  userId: string
): Promise<AxiosResponse<AllMovie>> => {
  return axios.get(`/all-movies?userId=${userId}`)
}

export const addNewMovie = (data: FormData): Promise<AxiosResponse<Status>> => {
  return axios.post('/add-movie', data)
}

export const changeMovie = (data: FormData): Promise<AxiosResponse<Status>> => {
  return axios.put('/change-movie', data)
}

export const deleteMovie = (
  id: string
): Promise<AxiosResponse<DeletedMovieId>> => {
  return axios.delete(`/delete-movie?id=${id}`)
}
