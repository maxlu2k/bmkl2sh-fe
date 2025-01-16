<template>
  <div class="login align-items-center">
    <h1>Login</h1>
    <hr>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Email address</label>
        <input v-model="username" type="text" class="form-control" id="username" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input class="form-control" :type="showPassword ? 'text' : 'password'" v-model="password" name="pwd">
      </div>
      <div class="mb-3 form-check">
        <div class="row">
          <div class="col-5">
            <input type="checkbox" name="showpw" class="form-check-input showpw" id="showPass" v-model="showPassword">
            <label class="form-check-label" for="showPass">Check me out</label>
          </div>
          <div class="col-7 text-end">
            <label class="form-check-label"><a href="/register">Register an account</a></label>
          </div>
        </div>
      </div>
      <button class="btn btn-success btnlogin" type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Axios from '../../utils/axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

// Khai báo biến
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const showPassword = ref(false)
const authStore = useAuthStore()
const router = useRouter()

// Hàm xử lý đăng nhập
const handleLogin = async () => {
  try {
    const response = await Axios.post('/auth/loginn', {
      username: username.value,
      password: password.value,
    })
    const data = response.data
    const accessToken = data.accessToken
    const refreshToken = data.refreshToken
    Cookies.set('accessToken', accessToken, { expires: 1 / 24 })
    Cookies.set('refreshToken', refreshToken, { expires: 3 })

    // Giải mã token và lấy role
    const decoded = jwtDecode(accessToken)
    const role = decoded.scope || []
    // const user = decoded.sub
    // Cookies.set('username', user, { expires: 3 })

    authStore.login(accessToken, refreshToken)

    // Điều hướng dựa trên role
    if (role.includes('ADMIN')) {
      router.push('/admin/statics')
    } else {
      router.push('/')
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Invalid login information. Please try again.'
  }
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
  margin: 11% auto 11% auto
}

.error {
  color: red;
}
</style>
