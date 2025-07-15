<script setup lang="ts">
import { computed } from 'vue'

const modelValue = defineModel<string>()

const props = defineProps<{
  label?: string
  placeholder?: string
  error?: string
  type?: string
  required?: boolean
  disabled?: boolean
}>()

// 錯誤狀態
const inputClass = computed(() =>
  props.error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
)
</script>

<template>
  <div class="input-wrapper w-full flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
    <!-- 標題文字 -->
    <label
      v-if="label"
      class="input-label text-sm font-medium text-gray-700 whitespace-nowrap align-middle"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Input -->
    <input
      v-model="modelValue"
      :type="type || 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-3 py-2"
      :class="inputClass"
    />

    <!-- Error message -->
    <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
input {
  border: 1px solid var(--light-brown);
  // border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

input:focus {
  border-color: var(--primary-hover);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-hover) 50%, transparent);
}

input--error {
  border-color: var(--accent-color);
}

input--error:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
}

.error-text {
  font-size: 12px;
  color: var(--accent-color);
}
</style>
