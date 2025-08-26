<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useRouter } from 'vue-router'

withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

const { y } = useWindowScroll()

const isHidden = ref(false)
let lastY = 0

watch(y, newY => {
  if (newY > lastY && newY > 50) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
  lastY = newY
})

// 縮小 Header
const isShrink = computed(() => !isHidden.value && y.value > 100)

const router = useRouter()

function goHome() {
  router.push({ name: 'HomePage' })
}
</script>

<template>
  <header
    class="header-container fixed top-0 left-0 transition-all duration-300"
    :class="{ '-translate-y-full': isHidden, 'h-18': isShrink, 'h-20': !isShrink }"
  >
    <div class="img-container m-auto relative" @click="goHome">
      <img src="../assets/images/logo.svg" alt="logo.svg" />
      <div
        class="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"
      ></div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  display: flex;
  z-index: 9999;
  background: var(--white);
  border-bottom: 2px solid var(--secondary-color);
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);

  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
