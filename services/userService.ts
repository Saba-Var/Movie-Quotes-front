import { Status, UserData } from 'types'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const changePassword = (
  password: string
): Promise<AxiosResponse<Status>> => {
  return axios.post('/change-password', { password })
}

export const getUserDetails = (
  accessToken: string
): Promise<AxiosResponse<UserData>> => {
  return axios.get(`/user-details?accessToken=${accessToken}`)
}
