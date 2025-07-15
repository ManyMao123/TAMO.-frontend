<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ label?: string; value?: boolean | string }>(), {
  label: '選項',
  value: true
})

const emit = defineEmits(['update:modelValue'])
const modelValue = defineModel<string | boolean>()

const isChecked = computed({
  get() {
    return modelValue.value === props.value
  },
  set(val: boolean) {
    if (typeof props.value === 'string') {
      modelValue.value = val ? props.value : undefined
    } else {
      modelValue.value = val
    }
  }
})
</script>

<template>
  <label class="checkbox-wrapper">
    <input type="checkbox" v-model="isChecked" />
    <span class="checkbox-label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 0.5rem;
  font-size: 14px;

  input[type='checkbox'] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid var(--light-brown);
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    transition:
      border-color 0.3s ease,
      background-color 0.3s ease;
  }

  input[type='checkbox']:checked {
    background-color: var(--primary-color, #b89a73);
    border-color: var(--primary-color, #b89a73);
  }

  input[type='checkbox']:checked::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 4px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  input[type='checkbox']:focus-visible {
    outline: 2px solid var(--primary-hover, #d2b48c);
    outline-offset: 2px;
  }

  input[type='checkbox']:disabled {
    cursor: not-allowed;
    border-color: #ccc;
    background-color: #eee;
  }

  input[type='checkbox']:disabled + .checkbox-label {
    color: #aaa;
    cursor: not-allowed;
  }
}

.checkbox-label {
  user-select: none;
}
</style>
