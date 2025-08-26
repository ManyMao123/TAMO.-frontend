<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'

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
</script>

<template>
  <header
    class="header-container fixed top-0 left-0 transition-transform duration-300"
    :class="{ '-translate-y-full': isHidden }"
  >
    <div class="img-container m-auto">
      <img src="../assets/images/logo.svg" alt="logo.svg" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: 78px;
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
