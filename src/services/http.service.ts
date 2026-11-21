import axiosInstance from '@/plugins/axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

const get = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url, config)
}

const HttpService = { get }

export default HttpService
