import { AxiosResponse } from 'axios'
import { Status } from 'types'
import axios from 'services'

export const imageUpload = (
  type: string,
  formData: FormData
): Promise<AxiosResponse<Status>> => {
  return axios.patch(`/upload-${type}-image`, formData)
}
