<template>
  <div class="row g-0 allpage" style="min-height: 100vh;">
    <div class="col-2">
      <adminlayout />
    </div>
    <div class="col-10 content_admin">
      <div class="container p-4">
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
  min-height: 100vh;
}

.allpage {
  background-color: rgb(216, 215, 215);
}

.container {
  margin-top: 20px;
  background-color: rgb(216, 215, 215);
}
</style>
