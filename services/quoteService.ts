import { AxiosResponse } from 'axios'
import { Status } from 'types'
import { Quotes } from 'types'
import axios from 'services'

export const getMovieQuotes = (id: string): Promise<AxiosResponse<Quotes>> => {
  return axios.get(`/movie-quotes?id=${id}`)
}

export const addQuote = (data: FormData): Promise<AxiosResponse<Status>> => {
  return axios.post('/add-quote', data)
}
