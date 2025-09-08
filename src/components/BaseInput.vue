<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const modelValue = defineModel<string>({ default: '' })

const props = defineProps<{
  label?: string
  placeholder?: string
  error?: string
  type?: 'text' | 'number'
  required?: boolean
  disabled?: boolean
}>()

const increment = () => {
  const val = (Number(modelValue.value) || 1) + 1
  modelValue.value = val.toString()
}

const decrement = () => {
  const val = Math.max(1, (Number(modelValue.value) || 1) - 1)
  modelValue.value = val.toString()
}
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
        min="1"
        class="w-full px-3 py-2"
      />
      <slot name="suffix"></slot>

      <div v-if="type === 'number'" class="number-button flex flex-col">
        <button
          class="w-6 h-1/2 flex justify-center items-center hover:bg-gray-100"
          @click="increment"
        >
          <Icon icon="flowbite:caret-up-solid" width="12" height="12" />
        </button>
        <button
          class="w-6 h-1/2 flex justify-center items-center hover:bg-gray-100"
          @click="decrement"
        >
          <Icon icon="flowbite:caret-down-solid" width="12" height="12" />
        </button>
      </div>
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
  border: 1px solid var(--light-brown);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  position: relative;

  &:focus-within {
    border-color: var(--primary-hover);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-hover) 50%, transparent);
  }
}

/* 隱藏 number input 原本的樣式 */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border-left: 1px solid var(--light-brown);
}
</style>
