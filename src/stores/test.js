import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userList = defineStore('listUser', () => {
  const user = ref([
    {
      id: '123',
    },
  ])

  return { user }
})
