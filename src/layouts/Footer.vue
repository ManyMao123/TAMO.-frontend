<script setup lang="ts">
withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })
</script>

<template>
  <div class="footer-container">
    <div class="footer-category">hii</div>
    <div class="footer-label">© 2025 TAMO Co. Ltd. All rights Reserved.</div>
  </div>
</template>

<style scoped lang="scss">
.footer-container {
  width: 100%;
  margin-top: var(--space-lg);

  .footer-category {
    padding-inline: var(--space-2xl);
    padding-block: var(--space-xl);
    min-height: 180px;
    background-color: var(--secondary-color);
    color: var(--white);
  }

  .footer-label {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-color);
    color: var(--white);
    font-weight: bold;
    flex-shrink: 0;
    font-size: 0.75rem;
    filter: brightness(0.8);
  }
}
</style>
