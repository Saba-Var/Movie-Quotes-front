import { NotificationPaginationData, Status } from 'types'
import { AxiosResponse } from 'axios'
import axios from 'services'

export const getUserNotifications = (
  id: string,
  page: number
): Promise<AxiosResponse<NotificationPaginationData>> => {
  return axios.get(`/user-notifications?id=${id}&page=${page}`)
}

export const markAsRead = (id: string): Promise<AxiosResponse<Status>> => {
  return axios.get(`/mark-as-read?id=${id}`)
}
