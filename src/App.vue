<script setup>
import { useAuthStore } from './stores/auth'
import Header from './views/partials/view_header.vue'
import Footer from './views/partials/view_footer.vue'
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import 'bootstrap-icons/font/bootstrap-icons.css';

const route = useRoute();
const authStore = useAuthStore()
authStore.checkLoginStatus() // Kiểm tra trạng thái đăng nhập khi load trang
watch(route, () => {
  document.title = route.meta.title || 'BM';
}, { immediate: true });

// const isAdminRoute = computed(() => route.path.startsWith('/admin'))
// Kiểm tra xem có cần hiển thị Header/Footer không
const showHeaderFooter = computed(() => {
  return !route.path.startsWith('/admin') && route.name !== 'login'
})

</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
<template>
  <div>
    <Header v-if="showHeaderFooter" :isLogin="authStore.isLogin" :username="authStore.username"
      @logout="authStore.logout" />

    <div :class="['bodycss', { container: showHeaderFooter }]">
      <RouterView />
    </div>

    <Footer v-if="showHeaderFooter" />
  </div>
</template>

<style scoped>
.bodycss {
  min-height: 800px;
}
</style>
