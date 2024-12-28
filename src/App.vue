<script setup>
import { useAuthStore } from './stores/auth'
import Header from './views/partials/view_header.vue'
import Footer from './views/partials/view_footer.vue'

const authStore = useAuthStore()
authStore.checkLoginStatus() // Kiểm tra trạng thái đăng nhập khi load trang
</script>

<template>
  <div>
    <Header :isLogin="authStore.isLogin" @logout="authStore.logout" />
    <div class="container bodycss">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.bodycss {
  min-height: 800px;
  padding: 20px 20px;
}
</style>
