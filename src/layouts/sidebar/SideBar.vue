<script setup lang="ts">
import BaseDrawer from '@/components/BaseDrawer.vue'
import MenuContent from './MenuContent.vue'
import SearchContent from './SearchContent.vue'
import { watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useUIStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'
import { useScrollLock } from '@vueuse/core'

withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

const uiStore = useUIStore()

const { isSidebarOpen, panelType } = storeToRefs(uiStore)
const { openSidebar, closeSidebar, toggleSidebar } = uiStore

// 鎖定 body 的滾動
const isLocked = useScrollLock(document.body)

// watch sidebar 狀態，控制 scroll lock
watch(isSidebarOpen, val => (isLocked.value = val))
</script>

<template>
  <div class="sidebar-container">
    <BaseDrawer v-model="isSidebarOpen" :show-close-button="false">
      <MenuContent v-if="panelType === 'menu'" />
      <SearchContent v-if="panelType === 'search'" />
    </BaseDrawer>

    <!-- 關閉按鈕 -->
    <Transition name="fade">
      <button
        v-show="isSidebarOpen"
        class="close-button flex flex-col items-center justify-center"
        @click="closeSidebar"
      >
        <Icon icon="flowbite:close-outline" width="24" height="24" />
      </button>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container :deep(.drawer) {
  padding: 0;
}

/* 按鈕 fade 樣式 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

// 右下角關閉按鈕
.close-button {
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(184, 154, 115, 0.7);
  position: fixed;
  right: 24px;
  bottom: 10px;
  z-index: 50005;
  color: var(--white);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(210, 180, 140, 0.7);
  }
}
</style>
