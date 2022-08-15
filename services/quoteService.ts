import { AxiosResponse } from 'axios'
import { Status } from 'types'
import axios from 'services'

export const addQuote = (data: FormData): Promise<AxiosResponse<Status>> => {
  return axios.post('/add-quote', data)
}
