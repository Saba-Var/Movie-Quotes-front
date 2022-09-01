import { Status, UserData } from 'types'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const changePassword = (
  password: string,
  id: string
): Promise<AxiosResponse<Status>> => {
  return axios.put(`/change-password?id=${id}`, { password })
}

export const getUserDetails = (
  accessToken: string
): Promise<AxiosResponse<UserData>> => {
  return axios.get(`/user-details?accessToken=${accessToken}`)
}

export const changeUsername = (
  username: string,
  id: string
): Promise<AxiosResponse<Status>> => {
  return axios.put('/change-username', { username, id })
}
