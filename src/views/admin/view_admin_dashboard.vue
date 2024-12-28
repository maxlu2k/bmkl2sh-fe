<template>
  <div class="pt-3">
    <div class="card" style="width: 18rem">
      <img src="/img/avar/long.jpg" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Welcome {{ user.username }} !!</h5>
        <p class="card-text">
          Roles:
          <span v-for="(role, index) in user.roles" :key="index">
            {{ role.name }}<span v-if="index < user.roles.length - 1">, </span>
          </span>
        </p>
        <p class="card-text">
          Description:
          <span v-for="(role, index) in user.roles" :key="index">
            {{ role.description }}<span v-if="index < user.roles.length - 1">, </span>
          </span>
        </p>
        <a href="#" class="btn btn-primary" @click.prevent="goToAdminPage">Quản lý User</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Axios from '../../utils/axios'
import Cookies from 'js-cookie'
const user = ref({
  username: '',
  roles: [],
  description: '',
})
import { useRouter } from 'vue-router'

const router = useRouter()

function goToAdminPage() {
  router.push('/admin/alluser')
}

async function fetchUserData() {
  const token = Cookies.get('accessToken')
  try {
    const response = await Axios.get('/api/users/myInfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    user.value = response.data.result
  } catch (error) {
    console.error(error)
    if (error.response && error.response.status === 401) {
      refreshAccessToken()
    }
  }
}

async function refreshAccessToken() {
  const refreshToken = Cookies.get('refreshToken')
  try {
    const response = await Axios.post('/auth/refresh', { refreshToken })
    const newAccessToken = response.data.accessToken
    Cookies.set('accessToken', newAccessToken, {
      path: '/',
    })
    console.log('Token refreshed')
    fetchUserData()
  } catch (error) {
    console.error('Failed to refresh token:', error)
    window.location.href = '/login'
  }
}

// Khi component mount, bắt đầu fetch data và thiết lập idle listener
onMounted(() => {
  fetchUserData()
})
</script>
