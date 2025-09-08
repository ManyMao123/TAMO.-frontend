<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ text?: string; width?: string | number; plain?: boolean; disabled?: boolean }>(),
  {
    text: 'Button',
    plain: false,
    disabled: false
  }
)

const customWidth = computed(() => props.width + 'px')
</script>

<template>
  <div
    class="button"
    :style="{ maxWidth: customWidth }"
    :class="{ 'is-plain': plain, 'is-disabled': disabled }"
  >
    <p class="button__label">
      <slot>{{ text }}</slot>
    </p>
  </div>
</template>

<style scoped lang="scss">
.button {
  cursor: pointer;
  border-radius: var(--border-radius);
  padding: var(--space-xs);
  background-color: var(--primary-color);
  width: 100%;
  min-width: 100px;
  box-sizing: border-box;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:active {
    background-color: var(--primary-active);
  }
}

.button__label {
  color: var(--white);
  margin-block: var(--space-xs);
  margin-inline: var(--space-sm);
  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
}

.button.is-plain {
  background-color: transparent;
  border: 1px solid var(--primary-color);

  &:hover {
    opacity: 0.8;
    background-color: var(--primary-color);
  }

  &:active {
    opacity: 0.8;
    background-color: var(--primary-active);
  }

  &:hover .button__label,
  &:active .button__label {
    color: var(--white);
  }

  .button__label {
    color: var(--primary-color);
  }
}

.button.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: var(--white);
  border-color: var(--secondary-hover);

  &:hover,
  &:active {
    background-color: var(--white);
    color: var(--secondary-active);
  }

  .button__label {
    color: var(--secondary-active);
  }

  &:hover .button__label {
    color: var(--secondary-active);
  }
}
</style>
