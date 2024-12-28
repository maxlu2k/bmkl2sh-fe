<template>
  <div class="login align-items-center">
    <h1>Login</h1>
    <hr>
    <!-- <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label" for="username">Username</label>
        <input v-model="username" type="text" id="username" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="password">Password</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <button class="btn btn-success btnlogin" type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form> -->
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Email address</label>
        <input v-model="username" type="text" class="form-control" id="username" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="password">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button class="btn btn-success btnlogin" type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
// import { BASE_URL } from '../../utils/axios'
// import axios from 'axios'
import Axios from '../../utils/axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '../../stores/auth'

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore() // phải gọi trực tiếp trong setup hặc export
      try {
        const response = await Axios.post(`/auth/loginn`, {
          username: this.username,
          password: this.password,
        })
        const data = response.data
        const accessToken = data.accessToken
        const refreshToken = data.refreshToken
        Cookies.set('accessToken', accessToken, { expires: 1 / 24 })
        Cookies.set('refreshToken', refreshToken, { expires: 1 / 24 })
        // Giải mã token và lấy role
        const decoded = jwtDecode(accessToken)
        console.log(decoded)
        const role = decoded.scope
        const username = decoded.sub

        // Lưu vai trò vào cookie hoặc localStorage
        Cookies.set('role', role, { expires: 3 })
        Cookies.set('username', username, { expires: 3 })
        console.log(role.toLowerCase())
        authStore.login(accessToken, refreshToken)
        // Chuyển hướng tới trang phù hợp
        if (role === 'ADMIN') {
          this.$router.push('/admin')
        } else {
          this.$router.push('/user-profile')
        }
      } catch (error) {
        // console.log(error)
        if (error.response && error.response.data.message) {
          this.errorMessage = error.response.data.message
        } else {
          this.errorMessage = 'An error occurred. Please try again.'
        }
      }
    },
  },
}
</script>

<style scoped>
.login h1 {
  text-align: center;
}

.login {
  color: aliceblue;
  background-color: rgb(33, 37, 41);
  width: 350px;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}

.error {
  color: red;
}
</style>
