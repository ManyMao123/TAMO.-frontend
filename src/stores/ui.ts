import { defineStore } from 'pinia'
import { ref } from 'vue'

export type SideBarPanel = 'menu' | 'search' | null

export const useUIStore = defineStore('ui', () => {
  const isSidebarOpen = ref(false)
  const panelType = ref<SideBarPanel>(null)

  const openSidebar = (panel: SideBarPanel = 'menu') => {
    panelType.value = panel
    isSidebarOpen.value = true
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
    panelType.value = null
  }

  const toggleSidebar = (panel?: SideBarPanel) => {
    if (panel) {
      panelType.value = panel
    }
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return { isSidebarOpen, panelType, openSidebar, closeSidebar, toggleSidebar }
})
