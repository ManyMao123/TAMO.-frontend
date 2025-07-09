<script setup lang="ts">
import { Icon } from '@iconify/vue'
withDefaults(defineProps<{ img?: string; text?: string }>(), { img: '', text: '' })
</script>

<template>
  <div class="option-container">
    <div class="flex justify-between w-full">
      <div class="flex items-center gap-4">
        <img class="h-[66px]" :src="img" alt="" />
        <span>one／ 有庫存</span>
      </div>

      <div class="flex items-center gap-4 w-full max-w-[230px]">
        <BaseButton :width="160">加入購物車</BaseButton>
        <div class="btn__favorite">
          <Icon :icon="`material-symbols:heart-plus-outline-rounded`" width="24" height="24" />
        </div>
      </div>
    </div>
    <span>{{ text?.toUpperCase() }}</span>
  </div>
</template>

<style scoped lang="scss">
.option-container {
  span {
    font-size: 0.75rem;
  }
}
.btn__favorite {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--light-gray);
  cursor: pointer;
}
</style>
