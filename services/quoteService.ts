import { DeletedQuoteId } from './types.d'
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

export const deleteQuote = (
  id: string
): Promise<AxiosResponse<DeletedQuoteId>> => {
  return axios.delete(`/delete-quote?id=${id}`)
}

export const editQuote = (data: FormData): Promise<AxiosResponse<Status>> => {
  return axios.put('/change-quote', data)
}

export const likeQuote = (
  quoteId: string,
  userId: string
): Promise<AxiosResponse<Status>> => {
  return axios.put(`/like-quote?quoteId=${quoteId}&userId=${userId}`)
}
