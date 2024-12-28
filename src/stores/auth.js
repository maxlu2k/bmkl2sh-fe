import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: !!Cookies.get('accessToken'), // Kiểm tra token từ cookie
    username: Cookies.get('username') || '',
    role: Cookies.get('role') || '',
  }),

  actions: {
    login(accessToken, refreshToken) {
      const decoded = jwtDecode(accessToken)
      this.isLogin = true
      this.username = decoded.sub
      this.role = decoded.scope
      // this.avartar = '/img/avar/long.jpg'

      // Lưu vào cookie
      Cookies.set('accessToken', accessToken, { expires: 1 / 24 })
      Cookies.set('refreshToken', refreshToken, { expires: 1 / 24 })
      Cookies.set('username', this.username, { expires: 3 })
      Cookies.set('role', this.role, { expires: 3 })
    },

    logout() {
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
