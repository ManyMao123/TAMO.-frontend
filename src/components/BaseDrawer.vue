<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(defineProps<{ modelValue: boolean; side?: 'left' | 'right' }>(), {
  side: 'right'
})

const emit = defineEmits(['update:modelValue'])

function closeDrawer() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div v-if="modelValue" class="drawer-overlay" @click="closeDrawer"></div>

  <transition name="slide">
    <div
      v-if="modelValue"
      class="drawer"
      :class="side === 'right' ? 'drawer-right' : 'drawer-left'"
    >
      <!-- 右上角關閉按鈕 -->
      <button class="drawer-close-btn" @click="closeDrawer">
        <Icon icon="flowbite:close-outline" width="20" height="20" />
      </button>

      <slot></slot>
    </div>
  </transition>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 80%;
  max-width: 320px;
  background: #fff;
  z-index: 10008;
  overflow-y: auto;
  transition: transform 0.3s ease;
  padding-inline: 20px;
  border-radius: 6px 0 0 6px;
  margin-block: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.drawer-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
}

.drawer-right {
  right: 0;
}

.drawer-left {
  left: 0;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
