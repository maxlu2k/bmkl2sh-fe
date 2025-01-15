<template>
  <div v-if="visible" :class="`alert alert-${type}`" role="alert">
    {{ message }}
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success", // Các loại: success, danger, warning, info
  },
  duration: {
    type: Number,
    default: 3000, // Thời gian hiển thị alert (ms)
  },
});

const visible = ref(true);

// Tự động ẩn alert sau duration
watch(
  () => props.message,
  (newValue) => {
    if (newValue) {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.alert {
  margin: 10px 0;
}
</style>
