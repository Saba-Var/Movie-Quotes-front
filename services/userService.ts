import { AxiosResponse } from 'axios'
import axios from 'services'
import {
  AccountVerificationToken,
  GoogleUserData,
  NewUserData,
  Status,
  Token,
} from './types.d'

export const registerUSer = (
  data: NewUserData
): Promise<AxiosResponse<Status>> => {
  return axios.post('/register-user', data)
}

export const registerGoogleUSer = (
  data: GoogleUserData
): Promise<AxiosResponse<Token>> => {
  return axios.post('/register-google-user', data)
}

export const activateUserAccount = (
  data: AccountVerificationToken
): Promise<AxiosResponse<Status>> => {
  return axios.get(`/activate-account?token=${data.token}`)
}
