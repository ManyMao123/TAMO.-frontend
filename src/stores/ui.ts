import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isSidebarOpen = ref(false)
  const openSidebar = () => {
    isSidebarOpen.value = true
  }
  const closeSidebar = () => {
    isSidebarOpen.value = false
  }
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return { isSidebarOpen, openSidebar, closeSidebar, toggleSidebar }
})
