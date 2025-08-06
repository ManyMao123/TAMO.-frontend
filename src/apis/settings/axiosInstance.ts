import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 請求攔截器，加入 token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 回應攔截器，只取 response.data
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    // 這邊可以統一錯誤處理，例如通知使用者
    return Promise.reject(error)
  }
)

export default axiosInstance
