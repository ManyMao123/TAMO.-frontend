<script setup lang="ts">
import { defineEmits } from 'vue'
import { reactive } from 'vue'

const emit = defineEmits<{
  (e: 'submit', values: Record<string, any>): void
}>()

// 你可以用 ref 來儲存表單資料

const formData = reactive<Record<string, any>>({})

// 處理表單送出事件
function handleSubmit(e: Event) {
  e.preventDefault()
  emit('submit', formData)
}
</script>

<template>
  <form @submit="handleSubmit" class="w-full flex flex-col gap-4">
    <slot :formData="formData" />
  </form>
</template>

<style scoped></style>
