<template>
  <div class="vue-modal">
    <div class="vue-inner">
      <div class="vue-modal-content">
        <slot></slot> <!-- Hiển thị nội dung từ component cha -->
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.vue-modal {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vue-inner {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}
</style>
