import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const BASE_URL = 'http://localhost:8080'

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let failedQueue = []

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Kiểm tra token có hết hạn không
function isTokenExpired(token) {
  if (!token) return true
  try {
    const decoded = jwtDecode(token)
    return decoded.exp * 1000 < Date.now()
  } catch (error) {
    console.log(error)
    return true
  }
}

// Interceptor request - Chặn request khi token hết hạn
Axios.interceptors.request.use(
  async (config) => {
    let token = Cookies.get('accessToken')

    // Nếu chưa đăng nhập, bỏ qua interceptor
    if (!token) {
      return config
    }

    // Nếu token hết hạn
    if (isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const refreshToken = Cookies.get('refreshToken')
          if (!refreshToken) {
            throw new Error('No refresh token found')
          }

          // Gọi API refresh token
          const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
          const newAccessToken = response.data.accessToken

          // Cập nhật accessToken mới
          Cookies.set('accessToken', newAccessToken, { path: '/' })

          // Gửi lại các request đang chờ với token mới
          processQueue(null, newAccessToken)
        } catch (error) {
          processQueue(error, null)
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          window.location.href = '/login'
        } finally {
          isRefreshing = false
        }
      }

      // Đợi đến khi refresh xong
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (newToken) => {
            config.headers['Authorization'] = `Bearer ${newToken}`
            resolve(config)
          },
          reject: (err) => {
            reject(err)
          },
        })
      })
    }

    // Nếu token còn hạn, gắn vào header
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor response - Xử lý lỗi 401
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default Axios
export { BASE_URL }
