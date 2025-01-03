<template>
  <div>
    <p>All Users</p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Active</th>
          <th scope="col">Verify mail</th>
          <th scope="col">Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span v-for="(role, index) in user.roles" :key="index">
              {{ role.name }}<span v-if="index < user.roles.length - 1">, </span>
            </span>
          </td>
          <td>
            <span v-if="user.isActive" style="color: green">Đang hoạt động</span>
            <span v-else style="color: red">Ngừng hoạt động</span>
          </td>
          <td>
            <span v-if="user.isVerify" style="color: green">Đã xác minh</span>
            <span v-else style="color: red">Đang xác minh</span>
          </td>
          <td>
            <a href="" class="btn btn-primary">Show</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Axios from '../../utils/axios'
import Cookies from 'js-cookie'
const users = ref([])

async function fetchUserData() {
  const token = Cookies.get('accessToken')
  try {
    const response = await Axios.get('/api/users/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    users.value = response.data
    console.log(users)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchUserData()
})
</script>
