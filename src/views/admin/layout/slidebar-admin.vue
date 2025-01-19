<template>
  <div class="d-flex flex-column flex-shrink-0 text-white sidebar_admin">
    <a href="/" class="d-flex align-items-center mb-4 text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32">
        <use xlink:href="#bootstrap" />
      </svg>
      <span class="fs-4">Admin Panel</span>
    </a>
    <hr class="text-secondary">
    <ul class="nav flex-column mb-auto">
      <li class="mb-2">
        <button class="btn btn-toggle align-items-center text-white w-100 text-start" data-bs-toggle="collapse"
          data-bs-target="#home-collapse" aria-expanded="false">
          <i class="bi bi-house-door-fill me-2"></i> Home
        </button>
        <div class="collapse" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled ps-4">
            <li><a href="#" class="text-decoration-none">Overview</a></li>
          </ul>
        </div>
      </li>
      <li>
        <button class="btn btn-toggle align-items-center text-white w-100 text-start" data-bs-toggle="collapse"
          data-bs-target="#home-collapse2" aria-expanded="false">
          <i class="bi bi-speedometer2 me-2"></i> Dashboard
        </button>
        <div class="collapse" id="home-collapse2">
          <ul class="btn-toggle-nav list-unstyled ps-4">
            <li><router-link to="/admin/statics" class="text-decoration-none">Thống Kê Và Báo Cáo</router-link></li>
          </ul>
        </div>
      </li>
      <li>
        <button class="btn btn-toggle align-items-center text-white w-100 text-start" data-bs-toggle="collapse"
          data-bs-target="#home-collapse3" aria-expanded="false">
          <i class="bi bi-table me-2"></i> Orders
        </button>
        <div class="collapse" id="home-collapse3">
          <ul class="btn-toggle-nav list-unstyled ps-4">
            <li><a href="#" class="text-decoration-none">Hoá Đơn</a></li>
          </ul>
        </div>
      </li>
      <li>
        <button class="btn btn-toggle align-items-center text-white w-100 text-start" data-bs-toggle="collapse"
          data-bs-target="#home-collapse4" aria-expanded="false">
          <i class="bi bi-grid-3x3-gap me-2"></i> Products
        </button>
        <div class="collapse" id="home-collapse4">
          <ul class="btn-toggle-nav list-unstyled ps-4">
            <li><a href="#" class="text-decoration-none">Quản Lý Sản Phẩm</a></li>
          </ul>
        </div>
      </li>
      <li>
        <button class="btn btn-toggle align-items-center text-white w-100 text-start" data-bs-toggle="collapse"
          data-bs-target="#home-collapse5" aria-expanded="false">
          <i class="bi bi-people me-2"></i> User
        </button>
        <div class="collapse" id="home-collapse5">
          <ul class="btn-toggle-nav list-unstyled ps-4">
            <li><router-link to="/admin/allusers" class="text-decoration-none">Quản Lý Người Dùng</router-link></li>
            <li><router-link to="/admin/authorize" class="text-decoration-none">Quản Lý Phân Quyền</router-link>
            </li>
            <li><router-link to="/admin/allBills" class="text-decoration-none">Quản Lý Hoá Đơn</router-link></li>
          </ul>
        </div>
      </li>
    </ul>

    <div class="dropdown mt-auto">
      <hr class="text-secondary">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1"
        data-bs-toggle="dropdown" aria-expanded="false">
        <img :src="authStore.avartar || '/img/avar/avartar-default.png'" alt="avatar"
          class="avartar_heade rounded-circle me-2" width="32" height="32" />
        <strong>
          {{ authStore.username }}
        </strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><router-link to="/admin/profile" class="text-decoration-none dropdown-item">Profile</router-link>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#" @click.prevent="logout">Sign out</a></li>
      </ul>
    </div>
  </div>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

// Sử dụng Pinia store
const authStore = useAuthStore()

// Kiểm tra trạng thái đăng nhập khi load trang
onMounted(() => {
  authStore.checkLoginStatus()
})

// Hàm logout
const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
.sidebar_admin {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: #212529;
  color: #fff;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.btn-toggle {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.btn-toggle:hover {
  color: orangered;
}

.nav-link {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.nav-link:hover {
  color: orangered;
}

.btn-toggle-nav a {
  font-size: 0.875rem;
  padding: 0.25rem 0;
  display: block;
  color: #adb5bd;
  transition: color 0.2s;
}

.btn-toggle-nav a:hover {
  color: orangered;
}
</style>
