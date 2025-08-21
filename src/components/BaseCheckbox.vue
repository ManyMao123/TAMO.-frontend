<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    value?: string | boolean
    modelValue?: string | boolean
    circle?: boolean
  }>(),
  {
    label: '選項',
    value: true,
    circle: false
  }
)

const emit = defineEmits(['update:modelValue'])

// inject group
const group = inject<{
  checkedList: Ref<Array<string | boolean>>
  toggleValue: (val: string | boolean) => void
} | null>('checkboxGroup', null)

const isChecked = computed({
  get() {
    if (group) {
      return group.checkedList.value.includes(props.value!)
    } else {
      return props.modelValue === props.value
    }
  },
  set(val: boolean) {
    if (group) {
      group.toggleValue(props.value!)
    } else {
      emit('update:modelValue', val ? props.value : undefined)
    }
  }
})
</script>

<template>
  <label class="checkbox-wrapper">
    <input type="checkbox" v-model="isChecked" :class="{ 'is-circle': circle }" />
    <span class="checkbox-label flex gap-1 items-center justify-center">
      <slot>{{ label }}</slot>
    </span>
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

  // 圓形
  input[type='checkbox'].is-circle {
    border-radius: 50%;
    border: 1px solid var(--border-gray);
  }

  input[type='checkbox'].is-circle::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 4px;
    height: 10px;
    border: solid var(--border-gray);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  input[type='checkbox'].is-circle:checked {
    border: 1px solid var(--light-brown);
  }

  input[type='checkbox'].is-circle:checked::after {
    border: solid var(--white);
    border-width: 0 2px 2px 0;
  }
}

.checkbox-label {
  user-select: none;
}
</style>
