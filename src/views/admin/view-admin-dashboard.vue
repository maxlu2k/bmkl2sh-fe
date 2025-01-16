<template>
  <div class="row g-0" style="min-height: 100vh;">
    <div class="col-2">
      <adminlayout />
    </div>
    <div class="col-10 content_admin">
      <div class="container p-4" style="background-color: #f8f9fa;">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import adminlayout from '@/views/admin/layout/slidebar-admin.vue'

</script>
<style scoped>
.content_admin {
  overflow-y: auto;
  /* Nếu nội dung quá dài, có thể cuộn */
  min-height: 100vh;
}
</style>
