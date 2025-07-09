<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = withDefaults(defineProps<{ title?: string; defaultExpanded?: boolean }>(), {
  title: '標題1',
  defaultExpanded: false
})

const isExpanded = ref(props.defaultExpanded)
</script>

<template>
  <div class="collapse-container">
    <h2
      class="panel-title"
      id="panel-title"
      aria-controls="panel-content"
      :aria-expanded="isExpanded"
      @click="isExpanded = !isExpanded"
    >
      <span>{{ title }}</span>
      <Icon icon="flowbite:angle-down-outline" width="24" height="24" />
    </h2>

    <div
      class="panel-content"
      id="panel-content"
      aria-labelledby="panel-title"
      :aria-hidden="!isExpanded"
    >
      <div class="slot-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collapse-container {
  padding-inline: var(--space-lg);
  border-top: 1px solid var(--light-gray);
  height: fit-content;
  padding-top: var(--space-md);
}

.panel-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;

  span {
    font-size: 0.875rem;
    font-weight: 700;
  }
}

.panel-content {
  display: grid;
  grid-template-rows: 0fr;
  padding-top: var(--space-md);
  padding-bottom: 0;
  transition: grid-template-rows 0.5s ease-out;

  &[aria-hidden='false'] {
    grid-template-rows: 1fr;
    padding-bottom: var(--space-md);
  }

  .slot-wrapper {
    overflow: hidden;
    font-size: 0.75rem;
  }
}
</style>
