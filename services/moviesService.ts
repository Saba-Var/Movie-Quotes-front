import { AxiosResponse } from 'axios'
import { Status } from 'types'
import axios from 'services'

export const getFilmGenres = (): Promise<AxiosResponse<Status>> => {
  return axios.get('/film-genres')
}
