<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  breadcrumbs: BreadcrumbItem[]
}>()

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

const breadcrumbItems = computed(() =>
  props.breadcrumbs.map((item, index, arr) => ({
    ...item,
    isActive: index === arr.length - 1
  }))
)
</script>

<template>
  <BBreadcrumb class="breadcrumb-container">
    <template v-for="(item, index) in breadcrumbItems" :key="index">
      <BBreadcrumbItem v-if="!item.isActive" :href="item.href">
        <Icon
          v-if="item.icon"
          :icon="item.icon"
          width="16"
          height="16"
          class="inline-block mr-1 align-top"
        />
        <span v-else> {{ item.label }}</span>
      </BBreadcrumbItem>

      <BBreadcrumbItem v-else active>
        <span>{{ item.label }}</span>
      </BBreadcrumbItem>
    </template>
  </BBreadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb-container {
  :deep(ol.breadcrumb) {
    margin: auto;
    font-size: 0.75rem;
  }

  :deep(.active) span {
    font-weight: bold;
  }

  :deep(.breadcrumb-item + .breadcrumb-item) {
    position: relative;
    padding-left: 27px;
  }

  :deep(.breadcrumb-item + .breadcrumb-item::before) {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    position: absolute;
    top: 4px;
    left: 5px;
    border-top: solid 1px var(--light-brown);
    border-right: solid 1px var(--light-brown);
    transform: rotate(45deg);
  }
}
</style>
