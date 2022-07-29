import { NewUserData, Status, AccountVerificationData } from './types.d'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const registerUSer = (
  data: NewUserData
): Promise<AxiosResponse<Status>> => {
  return axios.post('/register-user', data)
}

export const activateUserAccount = (
  data: AccountVerificationData
): Promise<AxiosResponse<Status>> => {
  return axios.put(
    `/activate-account?email=${data.email}&token=${data.token}`,
    data
  )
}
