<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ text?: string; width?: string | number }>(), {
  text: 'Button',
  width: 120
})

const customWidth = computed(() => props.width + 'px')
</script>

<template>
  <div class="button" :style="{ maxWidth: customWidth }">
    <p class="button__label">
      <slot>{{ text }}</slot>
    </p>
  </div>
</template>

<style scoped lang="scss">
.button {
  cursor: pointer;
  // border: 1px solid var(--white);
  border-radius: var(--border-radius);
  padding: var(--space-xs);
  background-color: var(--primary-color);
  width: 100%;
  min-width: 100px;
  // max-width: v-bind(customWidth);

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.8);
  }
}

.button__label {
  color: var(--white);
  margin-block: var(--space-xs);
  margin-inline: var(--space-sm);
  font-size: 1rem;
  text-align: center;
}
</style>
