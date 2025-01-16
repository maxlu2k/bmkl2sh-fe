<template>
  <div>
    <Header :isLogin="authStore.isLogin" :username="authStore.username" @logout="authStore.logout" />
    <div class="container bodycss">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Header from '../partials/view-header.vue'
import Footer from '../partials/view-footer.vue'
// import { useRoute } from 'vue-router';
// const route = useRoute();
</script>
<style scoped></style>
