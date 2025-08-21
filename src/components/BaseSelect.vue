<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  modelValue: string | number | null
  options: { label: string; value: string | number }[]
}>()

const emit = defineEmits(['update:modelValue'])

const selectRef = ref(null)

const isOpen = ref(false)
const toggleOpen = () => (isOpen.value = !isOpen.value)
const close = () => (isOpen.value = false)

const selectOption = (value: string | number) => {
  emit('update:modelValue', value)
  close()
}

const selectedLabel = computed(() => {
  const selected = props.options.find(o => o.value === props.modelValue)
  return selected?.label ?? '請選擇'
})

onClickOutside(selectRef, () => close())
</script>

<template>
  <div class="select-container relative inline-block w-full" ref="selectRef">
    <!-- 顯示選擇 -->
    <div class="select-trigger flex justify-between items-center p-2" @click="toggleOpen">
      <span class="select-text truncate">{{ selectedLabel }}</span>
      <Icon icon="flowbite:angle-down-outline" width="16" height="16" />
    </div>

    <!-- Option list -->
    <div v-if="isOpen" class="select-dropdown absolute z-10 w-full mt-1 shadow-md">
      <div
        v-for="option in options"
        :key="option.value"
        class="select-option px-4 py-2 hover:bg-gray-100"
        :class="{ 'select-option--active': option.value === modelValue }"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-trigger {
  border-bottom: 1px solid var(--border-gray);
  cursor: pointer;
  font-size: 0.875rem;
}

.select-text {
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.select-dropdown {
  font-size: 0.875rem;
  border: 1px solid var(--border-gray);
  background-color: var(--white);
}

.select-option {
  cursor: pointer;
  &--active {
    background-color: #e0f2fe;
    font-weight: bold;
  }
}
</style>
