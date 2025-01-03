<script setup>
import { useAuthStore } from './stores/auth'
import Header from './views/partials/view_header.vue'
import Footer from './views/partials/view_footer.vue'
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore()
authStore.checkLoginStatus() // Kiểm tra trạng thái đăng nhập khi load trang
watch(route, () => {
  document.title = route.meta.title || 'BM';
}, { immediate: true });
</script>

<template>
  <div>
    <Header :isLogin="authStore.isLogin" :username="authStore.username" @logout="authStore.logout" />
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
