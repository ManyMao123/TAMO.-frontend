import axiosInstance from '../settings/axiosInstance'
import { merge } from 'lodash-es'

const apiClient = {
  get: <T>(url: string, mode?: string, config = {}) => {
    if (mode === 'test') {
      return axiosInstance.get<T>(url, merge({ params: { mode: 'test' } }, config))
    }
    return axiosInstance.get<T>(url, config)
  },

  post: <T>(url: string, data: any, mode?: string, config = {}) => {
    if (mode === 'test') {
      return axiosInstance.post<T>(url, data, merge({ params: { mode: 'test' } }, config))
    }
    return axiosInstance.post<T>(url, data, config)
  },

  put: <T>(url: string, data: any, mode?: string, config = {}) => {
    if (mode === 'test') {
      return axiosInstance.put<T>(url, data, merge({ params: { mode: 'test' } }, config))
    }
    return axiosInstance.put<T>(url, data, config)
  },

  patch: <T>(url: string, data: any, mode?: string, config = {}) => {
    if (mode === 'test') {
      return axiosInstance.patch<T>(url, data, merge({ params: { mode: 'test' } }, config))
    }
    return axiosInstance.patch<T>(url, data, config)
  },

  delete: <T>(url: string, mode?: string, config = {}) => {
    if (mode === 'test') {
      return axiosInstance.delete<T>(url, merge({ params: { mode: 'test' } }, config))
    }
    return axiosInstance.delete<T>(url, config)
  }
}

export default apiClient
