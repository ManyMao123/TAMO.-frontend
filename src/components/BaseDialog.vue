<script setup lang="ts">
withDefaults(defineProps<{ text?: string }>(), { text: '輸入文字' })

const dialogVisible = defineModel()
</script>

<template>
  <div class="dialog" v-show="dialogVisible">
    <div class="dialog__overlay" @click="dialogVisible = false"></div>

    <div class="dialog__container">
      <p class="dialog__label">
        <slot>{{ text }}</slot>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  position: fixed;

  &__overlay {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }

  &__container {
    position: relative;
    background: var(--white);
    padding: var(--space-xl);
    border-radius: var(--border-radius);
    z-index: 101;
  }

  &__label {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-color);
  }
}
</style>
