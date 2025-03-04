<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MY BLOG</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px">
          <li class="nav-item">
            <a class="nav-link fs-6" aria-current="page" href="#">About me</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-6" href="#">Technology</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-6" href="#">Contact</a>
          </li>
        </ul>

        <!-- Hiển thị avatar và tên user khi đăng nhập -->
        <div v-if="authStore.isLogin" class="d-flex header_infor">
          <img :src="authStore.avartar || '/img/avar/avartar-default.png'" alt="Avatar" class="avartar_header" />
          <p>{{ authStore.username }}</p>
          <p>{{ authStore.lastName }}</p>
        </div>

        <form v-else class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

        <div>
          <a v-if="authStore.isLogin" href="#" @click.prevent="logout" class="btn btn-danger">Logout</a>
          <a v-else href="/login" class="btn btn-success">Login</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
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
.navbar{
  background-color:beige;
  border: 1px solid orangered;
}

.header_infor p {
  padding-left: 10px;
  margin: 0;
}

.header_infor {
  color: white;
  padding-right: 20px;
  align-items: center;
}

.avartar_header {
  max-width: 40px;
  border-radius: 50%;
}

</style>
