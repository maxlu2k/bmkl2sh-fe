<template>
  <div>
    <div class="list-users">
      <h5><b>All Users</b></h5>
      <hr>
      <div class="row search-row">
        <div class="col-7 d-flex">
          <input class="form-control search-width me-2" type="search" placeholder="Search" aria-label="Search">
          <!-- <button class="btn btn-outline-success me-2" type="submit">Search</button> -->
          <button class="btn btn-outline-primary text-decoration-none" @click="openModal(null)"><span
              aria-hidden="true"><i class="bi bi-patch-plus"></i></span>
            Add</button>
          <button class="btn btn-outline-success text-decoration-none" @click="openModal(null)"><span
              aria-hidden="true"><i class="bi bi-file-earmark-excel"></i></span>
            Import</button>
        </div>
        <div class="col-5 text-end ">
          <div class="text-end">
            <input type="checkbox" class="btn-check" v-model="isDarkMode" id="btn-check-outlined" autocomplete="off">
            <label class="btn btn-outline-dark rounded-circle" for="btn-check-outlined"><i
                class="bi bi-moon-stars-fill"></i></label>
          </div>
        </div>
      </div>
      <table :class="['table', 'table-striped', modeClass]">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">BirthDay</th>
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
            <td>{{ formatDate(user.dateOfBirth) }}</td>
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
            <label class="form-label"><strong>Date of birth:</strong></label>
            <input class="form-control" type="text" v-model="editedUser.dateOfBirth" @input="validateDate" />
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
            <AlertMessage v-if="alertMessage" :message="alertMessage" :type="alertType" :duration="3000" />
          </div>
        </form>
      </MyModal>
      <AlertMessage v-if="alertMessagePassword" :message="alertMessagePassword" :type="alertTypeMessagePassword"
        :duration="4000" />
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
import { format } from "date-fns";

// Trạng thái dark mode
const isDarkMode = ref(false);

// Tính toán class mode dựa trên trạng thái
const modeClass = computed(() => (isDarkMode.value ? 'table-dark' : 'table-light'));
const users = ref([])
const showModal = ref(false)
const selectedUser = ref({})
const editedUser = ref({})
const page = ref(0)
const size = ref(5)
const totalPage = ref(0)
const alertMessage = ref("");
const alertType = ref("success"); // success, danger, warning, info
const alertMessagePassword = ref("");
const alertTypeMessagePassword = ref("success");

const formatDate = (date) => {
  if (!date) return "";
  try {
    return format(new Date(date), "dd/MM/yyyy");
  } catch (error) {
    console.error("Lỗi định dạng ngày:", error);
    return date; // Trả về giá trị gốc nếu có lỗi
  }
};

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
  if (user) {
    selectedUser.value = user
    editedUser.value = {
      ...user,
      dateOfBirth: formatDate(user.dateOfBirth),
    }  // Sao chép để không làm thay đổi trực tiếp
    showModal.value = true
  } else {
    selectedUser.value = null;
    editedUser.value = {
      id: null,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: formatDate(editedUser.value.dateOfBirth),
      isActive: true,
      isVerify: false,
      roles: [],
    };
  }
  showModal.value = true;
}

// Đóng modal
const closeModal = () => {
  showModal.value = false
}

// Cập nhật thông tin user
const updateUser = async () => {
  try {
    const token = Cookies.get("accessToken");

    // Chuyển ngày từ dd/MM/yyyy về định dạng ISO
    const [day, month, year] = editedUser.value.dateOfBirth.split("/");
    const formattedDate = new Date(`${year}-${month}-${day}`).toISOString();
    editedUser.value.dateOfBirth = formattedDate;

    let response;
    if (!selectedUser.value) {
      // Thêm mới user
      alertMessagePassword.value = "";
      editedUser.value.password = "123456"
      response = await Axios.post('/api/users/add', editedUser.value);
      setTimeout(() => {
        alertMessagePassword.value = "password mặc định là '123456'";
        alertTypeMessagePassword.value = "warning";
      }, 0);
      console.log(response)
    }
    else {
      const response = await Axios.put(`/api/users/update/${editedUser.value.id}`, editedUser.value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data;
      const index = users.value.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        users.value[index] = updatedUser;
      }

    }

    alertMessage.value = "";
    setTimeout(() => {
      alertMessage.value = "Cập nhật người dùng thành công!";
      alertType.value = "success";
    }, 0);

    closeModal()
  } catch (error) {
    console.error('Cập nhật thất bại:', error)
    alertMessage.value = "";
    setTimeout(() => {
      alertMessage.value = "Đã xảy ra lỗi khi cập nhật!";
      alertType.value = "danger";
    }, 0);
  }
}

function validateDate(event) {
  const input = event.target.value;

  //regex định dạng ngày
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(input)) {
    alertMessage.value = "";
    setTimeout(() => {
      alertMessage.value = "Ngày không hợp lệ. Vui lòng nhập theo định dạng dd/MM/yyyy.";
      alertType.value = "danger";
    }, 0)
  } else {
    alertMessage.value = "";
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

.search-width {
  width: 180px;
}

.search-row {
  margin-bottom: 10px;
}
</style>
