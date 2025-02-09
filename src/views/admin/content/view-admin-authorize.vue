<template>
  <div>
    <div class="list-users">
      <h5><b>Phân Quyền</b></h5>
      <hr>
      <div class="row">
        <div class="col-6">
          <form class="d-flex form-search" @submit.prevent>
            <input v-model="searchQuery" class="form-control me-2" type="search"
              placeholder="Search by username or email" aria-label="Search" />
            <button :class="['btn', modeSearch]" type="button">Search</button>
          </form>
        </div>
        <div class="col-6 text-end">
          <input type="checkbox" class="btn-check" v-model="isDarkMode" id="btn-check-outlined" autocomplete="off">
          <label class="btn btn-outline-dark rounded-circle" for="btn-check-outlined"><i
              class="bi bi-moon-stars-fill"></i></label>
        </div>
      </div>
      <table :class="['table', 'table-striped', modeClass]">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col" colspan="3">Authorization</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td class="d-flex">
              <!-- Admin -->
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" :id="'check-admin-' + index"
                  :checked="hasRole(user.roles, 'ADMIN')"
                  @change="updateAuthorization(user.id, 'ADMIN', $event.target.checked)" />
                <label class="form-check-label" :for="'check-admin-' + index">Admin</label>
              </div>
              <!-- User -->
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" :id="'check-user-' + index"
                  :checked="hasRole(user.roles, 'USER')"
                  @change="updateAuthorization(user.id, 'USER', $event.target.checked)" />
                <label class="form-check-label" :for="'check-user-' + index">User</label>
              </div>
              <!-- Mod -->
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" :id="'check-mod-' + index"
                  :checked="hasRole(user.roles, 'MOD')"
                  @change="updateAuthorization(user.id, 'MOD', $event.target.checked)" />
                <label class="form-check-label" :for="'check-mod-' + index">Mod</label>
              </div>
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Axios from '@/utils/axios';
import Cookies from 'js-cookie'
const page = ref(0)
const size = ref(5)
const totalPage = ref(3)

const isDarkMode = ref(false);
const modeClass = computed(() => (isDarkMode.value ? 'table-dark' : 'table-light'));
const modeSearch = computed(() => (isDarkMode.value ? 'btn btn-outline-dark' : 'btn btn-dark'));

// Dữ liệu danh sách người dùng
const users = ref([]);
const searchQuery = ref('');

// Kiểm tra xem người dùng có vai trò cụ thể hay không
const hasRole = (roles, roleName) => {
  return roles.some((role) => role.name === roleName); // Giả định rằng roles là một mảng object {name: string}
};

// Gọi API để lấy danh sách user
const fetchUsers = async () => {
  const token = Cookies.get('accessToken')
  try {
    const response = await Axios.get('/auth/authorizations', {
      params: {
        page: page.value,
        size: size.value
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data);
    users.value = response.data.content || [];
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

// Lọc người dùng theo từ khóa tìm kiếm
const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Cập nhật quyền của người dùng
const updateAuthorization = async (userId, role, value) => {
  try {
    await Axios.put(`/auth/authorizations/${userId}`, { role, value });
    fetchUsers(); // Refresh danh sách
  } catch (error) {
    console.error('Failed to update authorization:', error);
  }
};


onMounted(() => {
  fetchUsers();
});

const visiblePages = computed(() => {
  const start = Math.max(0, page.value - 1)
  const end = Math.min(totalPage.value, start + 3)
  return Array.from({ length: end - start }, (_, i) => start + i + 1)
})
function firstPage() {
  if (page.value > 0) {
    page.value = 0;
    fetchUsers()
  }
}
function lastPage() {
  if (page.value < totalPage.value - 1) {
    page.value = totalPage.value - 1;
    fetchUsers()
  }
}
function nextPage() {
  if (page.value < totalPage.value - 1) {
    page.value++
    fetchUsers()
  }
}
function prevPage() {
  if (page.value > 0) {
    page.value--
    fetchUsers()
  }
}
function goToPage(targetPage) {
  page.value = targetPage - 1
  fetchUsers()
}
</script>

<style scoped>
.list-users {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  height: 100vh;
}

.form-switch {
  margin-right: 30px;
}

.form-check-label {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.form-search {
  width: 50%;
  margin-bottom: 10px;
}
</style>
