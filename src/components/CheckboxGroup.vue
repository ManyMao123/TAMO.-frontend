<script setup lang="ts">
import { provide } from 'vue'

const modelValue = defineModel<Array<string>>()

provide('checkboxGroup', {
  checkedList: modelValue,
  toggleValue: (val: string) => {
    if (!modelValue.value) return

    const index = modelValue.value.indexOf(val)

    if (index === -1) modelValue.value.push(val)
    else modelValue.value.splice(index, 1)
  }
})
</script>

<template>
  <div class="checkbox-group">
    <slot></slot>
  </div>
</template>
