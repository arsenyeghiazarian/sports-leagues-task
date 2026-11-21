import axiosInstance from '@/plugins/axios'

const get = (url: string) => {
  return axiosInstance({ method: 'get', url: url })
}

const HttpService = { get }

export default HttpService
