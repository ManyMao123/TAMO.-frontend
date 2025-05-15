<script setup lang="ts">
import { Icon } from '@iconify/vue'
withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })
</script>

<template>
  <BBreadcrumb class="breadcrumb-container">
    <BBreadcrumbItem href="#home">
      <Icon icon="flowbite:home-solid" width="16" height="16" />
    </BBreadcrumbItem>
    <BBreadcrumbItem href="#foo">商店一覽</BBreadcrumbItem>
    <BBreadcrumbItem active>TAMO</BBreadcrumbItem>
    <!-- <template #append><span class="mx-2">append text</span></template> -->
  </BBreadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb-container {
  margin-inline: var(--space-8xl);
  margin-block: var(--space-lg);

  :deep(ol.breadcrumb) {
    margin: auto;
    font-size: 0.75rem;
  }
}
</style>
