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
</script>

<template>
  <div class="input-field w-full flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
    <!-- 標題文字 -->
    <label
      v-if="label"
      class="input-label text-sm font-medium text-gray-700 whitespace-nowrap align-middle"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Input -->
    <div class="input-wrapper w-full flex justify-center items-center">
      <slot name="prefix"></slot>
      <input
        v-model="modelValue"
        :type="type || 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full px-3 py-2"
      />
      <slot name="suffix"></slot>
    </div>

    <!-- Error message -->
    <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
input {
  border: none;
  outline: none;
}

.input-wrapper {
  // border: 1px solid red;
  border: 1px solid var(--light-brown);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-within {
    border-color: var(--primary-hover);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-hover) 50%, transparent);
  }
}
</style>
