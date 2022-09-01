import { changePrimaryEmailRes } from './types.d'
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

export const changePrimaryEmail = (
  email: string,
  id: string
): Promise<AxiosResponse<changePrimaryEmailRes>> => {
  return axios.put('/change-primary-email', { email, id })
}

export const deleteEmail = (
  email: string,
  id: string
): Promise<AxiosResponse<Status>> => {
  return axios.delete(`/delete-secondary-email?id=${id}&email=${email}`)
}
