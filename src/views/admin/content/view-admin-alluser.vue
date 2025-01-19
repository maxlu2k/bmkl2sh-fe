<template>
  <div>
    <div class="list-users">
      <div class="row">
        <div class="col">
          <h5><b>All Users</b></h5>
        </div>
        <div class="col text-end">
          <a class="btn btn-outline-primary text-decoration-none" href="/admin"><span aria-hidden="true">&lt;</span>
            Previus</a>
        </div>
      </div>
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
              <button class="btn btn-info" @click="null">Detail</button>
              <button class="btn btn-warning" @click="openModal(user)">Update</button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: page === 0 }" @click="firstPage">
            <a class="page-link" href="#">
              <span aria-hidden="true">&lt;</span>
            </a>
          </li>
          <li class="page-item" :class="{ disabled: page === 0 }" @click="prevPage">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="item in visiblePages" :key="item" class="page-item" :class="{ active: item === page + 1 }">
            <a class="page-link" href="#" @click.prevent="goToPage(item)">
              {{ item }}
            </a>
          </li>
          <li class="page-item" :class="{ disabled: page >= totalPage - 1 }" @click="nextPage">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li class="page-item" :class="{ disabled: page >= totalPage - 1 }" @click="lastPage">
            <a class="page-link" href="#">
              <span aria-hidden="true">&gt;</span>
            </a>
          </li>
        </ul>
      </nav>
      <MyModal v-if="showModal" @close="closeModal">
        <h2>Thông tin người dùng</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-3">
            <label class="form-label"><strong>ID:</strong></label>
            <input class="form-control" type="text" v-model="editedUser.id" disabled />
          </div>

          <div class="mb-3">
            <label class="form-label"><strong>Username:</strong></label>
            <div class="input-group">
              <input class="form-control" type="text" v-model="editedUser.username" />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label"><strong>Tên:</strong></label>
            <div class="input-group">
              <input class="form-control" type="text" v-model="editedUser.firstName" />
              <input class="form-control" type="text" v-model="editedUser.lastName" />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label"><strong>Email:</strong></label>
            <input class="form-control" type="email" v-model="editedUser.email" />
          </div>
          <div class="mb-3">
            <label class="form-label"><strong>Phone Number:</strong></label>
            <input class="form-control" type="text" v-model="editedUser.phoneNumber" />
          </div>

          <div class="mb-3">
            <div class="row">
              <div class="col-6">
                <label class="form-label"><strong>Active:</strong></label>
                <label class="form-check">
                  <input class="form-check-label" type="radio" v-model="editedUser.isActive" :value="true" />
                  Hoạt động
                </label>
                <label class="form-check">
                  <input class="form-check-label" type="radio" v-model="editedUser.isActive" :value="false" />
                  Tạm dừng
                </label>
              </div>
              <div class="col-6">
                <label class="form-label"><strong>Verify:</strong></label>
                <label class="form-check">
                  <input class="form-check-label" type="radio" v-model="editedUser.isVerify" :value="true" />
                  Đã xác minh
                </label>
                <label class="form-check">
                  <input class="form-check-label" type="radio" v-model="editedUser.isVerify" :value="false" />
                  Chưa xác minh
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <button class="btn btn-outline-primary" type="submit">Cập nhật</button>
            <button class="btn btn-outline-danger" type="button" @click="closeModal">Đóng</button>
          </div>
        </form>
      </MyModal>
      <AlertMessage v-if="alertMessage" :message="alertMessage" :type="alertType" :duration="3000" />
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import Axios from '@/utils/axios'
import Cookies from 'js-cookie'
import MyModal from '@/components/MyModal.vue'
import AlertMessage from "@/components/AlertMessage.vue";
const users = ref([])
const showModal = ref(false)
const selectedUser = ref({})
const editedUser = ref({})
const page = ref(0)
const size = ref(5)
const totalPage = ref(0)
const alertMessage = ref("");
const alertType = ref("success"); // success, danger, warning, info

async function fetchUserData() {
  const token = Cookies.get('accessToken')
  try {
    const response = await Axios.get('/api/users/pageUsers', {
      params: {
        page: page.value,
        size: size.value
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = response.data
    users.value = data.content
    totalPage.value = data.totalPages
    // console.log(users)
    // console.log(totalPage.value)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchUserData()
})
const visiblePages = computed(() => {
  const start = Math.max(0, page.value - 1)
  const end = Math.min(totalPage.value, start + 3)
  return Array.from({ length: end - start }, (_, i) => start + i + 1)
})
function firstPage() {
  if (page.value > 0) {
    page.value = 0;
    fetchUserData()
  }
}
function lastPage() {
  if (page.value < totalPage.value - 1) {
    page.value = totalPage.value - 1;
    fetchUserData()
  }
}
function nextPage() {
  if (page.value < totalPage.value - 1) {
    page.value++
    fetchUserData()
  }
}
function prevPage() {
  if (page.value > 0) {
    page.value--
    fetchUserData()
  }
}
function goToPage(targetPage) {
  page.value = targetPage - 1
  fetchUserData()
}

// Hiển thị modal và gán thông tin user khi nhấn nút "show"
const openModal = (user) => {
  selectedUser.value = user
  editedUser.value = { ...user }  // Sao chép để không làm thay đổi trực tiếp
  showModal.value = true
}

// Đóng modal
const closeModal = () => {
  showModal.value = false
}

// Cập nhật thông tin user
const updateUser = async () => {
  try {
    const token = Cookies.get('accessToken')
    const response = await Axios.put(`/api/users/update/${editedUser.value.id}`, editedUser.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const updatedUser = response.data;
    const index = users.value.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      users.value[index] = updatedUser;
    }

    alertMessage.value = "";
    setTimeout(() => {
      alertMessage.value = "Cập nhật người dùng thành công!";
      alertType.value = "success";
    }, 0);

    closeModal()
  } catch (error) {
    console.error('Cập nhật thất bại:', error)
    alertMessage.value = "Đã xảy ra lỗi khi cập nhật!";
    alertType.value = "danger";
  }
}

</script>
<style scoped>
input[type="radio"] {
  accent-color: #007bff;
  cursor: pointer;
}

.list-users {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}
</style>
