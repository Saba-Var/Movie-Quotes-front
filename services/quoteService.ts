import { DeletedQuoteId, CommentReqBody } from './types.d'
import { Status, NewsFeedQuotes, Quotes } from 'types'
import { AxiosResponse } from 'axios'
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

export const dislikeQuote = (
  quoteId: string,
  userId: string
): Promise<AxiosResponse<Status>> => {
  return axios.put(`/dislike-quote?quoteId=${quoteId}&userId=${userId}`)
}

export const commentOnQuote = (
  data: CommentReqBody
): Promise<AxiosResponse<Status>> => {
  return axios.post('/add-comment', data)
}

export const getNewFeedQuotes = (
  page: number
): Promise<AxiosResponse<NewsFeedQuotes>> => {
  return axios.get(`/all-quotes?page=${page}`)
}

export const getNewsFeedPost = (
  searchValue: string
): Promise<AxiosResponse<Quotes>> => {
  return axios.get(`/news-feed-post?searchValue=${searchValue}`)
}
