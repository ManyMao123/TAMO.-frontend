<script setup lang="ts">
withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

const a = 1
const b = 2
defineExpose({
  a,
  b
})
</script>

<template>
  <div class="button">
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
  min-width: 100px;
  max-width: 120px;

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
