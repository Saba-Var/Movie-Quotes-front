import { NewUserData, Status } from './types.d'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const registerUSer = (
  data: NewUserData
): Promise<AxiosResponse<Status>> => {
  return axios.post('/register-user', data)
}
