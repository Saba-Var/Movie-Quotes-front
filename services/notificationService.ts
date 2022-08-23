import { NotificationPaginationData } from 'types'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const getUserNotifications = (
  id: string,
  page: number
): Promise<AxiosResponse<NotificationPaginationData>> => {
  return axios.get(`/user-notifications?id=${id}&page=${page}`)
}
