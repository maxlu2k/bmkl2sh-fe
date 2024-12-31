import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import Axios from '../utils/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: !!Cookies.get('accessToken'), // Kiểm tra token từ cookie
    username: Cookies.get('username') || '',
    role: Cookies.get('role') || '',
    errorMessage: '', // Thêm errorMessage để hiển thị lỗi khi cần
  }),

  actions: {
    login(accessToken, refreshToken) {
      const decoded = jwtDecode(accessToken)
      this.isLogin = true
      this.username = decoded.sub
      this.role = decoded.scope

      // Lưu vào cookie
      Cookies.set('accessToken', accessToken, { expires: 1 / 24 })
      Cookies.set('refreshToken', refreshToken, { expires: 1 / 24 })
      Cookies.set('username', this.username, { expires: 3 })
      Cookies.set('role', this.role, { expires: 3 })
    },

    async logout() {
      const refreshToken = Cookies.get('refreshToken')

      if (refreshToken) {
        try {
          await Axios.post('/auth/logout', { token: refreshToken })
        } catch (error) {
          console.error('Logout API failed:', error)
          if (error.response && error.response.data.message) {
            this.errorMessage = error.response.data.message
          } else {
            this.errorMessage = 'Failed to log out. Please try again.'
          }
        }
      }

      // Xóa token khỏi cookie và reset trạng thái
      this.isLogin = false
      this.username = ''
      this.role = ''
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      Cookies.remove('username')
      Cookies.remove('role')

      window.location.href = '/login'
    },

    checkLoginStatus() {
      const token = Cookies.get('accessToken')
      if (token) {
        const decoded = jwtDecode(token)
        this.isLogin = true
        this.username = decoded.sub
        this.role = decoded.scope
      } else {
        this.isLogin = false
        this.username = ''
        this.role = ''
      }
    },
  },
})
