import { AxiosResponse } from 'axios'
import axios from 'services'
import {
  AccountVerificationToken,
  GoogleUserData,
  NewUserData,
  LogInData,
  Status,
  Token,
} from 'types'

export const registerUSer = (
  data: NewUserData
): Promise<AxiosResponse<Status>> => {
  return axios.post('/register-user', data)
}

export const googleAuth = (
  data: GoogleUserData
): Promise<AxiosResponse<Token>> => {
  return axios.post('/google-auth', data)
}

export const activateUserAccount = (
  data: AccountVerificationToken
): Promise<AxiosResponse<Status>> => {
  return axios.get(`/activate-account?token=${data.token}`)
}

export const verifyEmail = (email: string): Promise<AxiosResponse<Status>> => {
  return axios.get(`/verify-email?email=${email}&type=password`)
}

export const authorization = (
  data: LogInData
): Promise<AxiosResponse<Token>> => {
  return axios.post('/authorization', data)
}
