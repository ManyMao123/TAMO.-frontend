<template>
  <div class="paginator-container flex items-center gap-1">
    <button
      v-show="currentPage !== 1"
      class="paginator-button px-1"
      @click="goToPage(currentPage - 1)"
    >
      <Icon icon="flowbite:angle-left-outline" width="16" height="16" />
    </button>

    <template v-for="page in showingPages" :key="page">
      <button
        v-if="page !== '...'"
        class="paginator-page px-1"
        :class="{ 'paginator-page--current': page === currentPage }"
        @click="goToPage(page as number)"
      >
        {{ page }}
      </button>
      <span v-else class="paginator-ellipsis select-none"> ... </span>
    </template>

    <button
      v-show="currentPage !== totalPages"
      class="paginator-button px-1"
      @click="goToPage(currentPage + 1)"
    >
      <Icon icon="flowbite:angle-right-outline" width="16" height="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  totalItems: number
  itemsPerPage: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
}>()

const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const showingPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 1 //選擇中間頁碼時，current前後各顯示幾個

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = []

  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  pages.push(1) // 固定顯示第1頁

  if (left > 2) {
    pages.push('...')
  }

  for (let i = left; i <= right; i++) {
    pages.push(i)
  }

  if (right < total - 1) {
    pages.push('...')
  }

  pages.push(total) // 固定顯示最後一頁

  return pages
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  emit('update:currentPage', page)
}
</script>

<style scoped lang="scss">
// .paginator-container {
// }

.paginator-button {
  font-size: 0.875rem;
  cursor: pointer;
}

.paginator-page {
  font-size: 0.875rem;
  cursor: pointer;

  &--current {
    box-shadow: 0 1px 0 var(--secondary-color);
  }
}
</style>
