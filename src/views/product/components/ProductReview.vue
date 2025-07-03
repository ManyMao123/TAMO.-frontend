<script setup lang="ts">
import { Icon } from '@iconify/vue'
withDefaults(defineProps<{ text?: string }>(), { text: '' })
</script>

<template>
  <div>
    <div class="review-container flex flex-col gap-2">
      <p>總體評價</p>
      <p>⭐⭐⭐⭐⭐ 4.4 （共 3 則評論）</p>

      <p>使用感</p>
      <div class="rating-bar">
        <div class="bar"></div>
        <div class="ticks"><span></span><span></span><span></span></div>
        <div class="flex justify-between">
          <span class="label">不好</span>
          <span class="label">很好</span>
        </div>
      </div>

      <p>重量</p>
      <div class="rating-bar">
        <div class="bar"></div>
        <div class="ticks"><span></span><span></span><span></span></div>
        <div class="flex justify-between">
          <span class="label">很重</span>
          <span class="label">很輕</span>
        </div>
      </div>

      <p>尺寸合身度</p>
      <div class="hist-bar">
        <div>
          <span>太小</span>
          <div class="bar"><div class="fill" :style="{ width: '3%' }"></div></div>
          <span>2人</span>
          <span>3%</span>
        </div>
        <div>
          <span>剛好</span>
          <div class="bar"><div class="fill" :style="{ width: '88%' }"></div></div>
          <span>61人</span>
          <span>88%</span>
        </div>
        <div>
          <span>太大</span>
          <div class="bar"><div class="fill" :style="{ width: '9%' }"></div></div>
          <span>6人</span>
          <span>9%</span>
        </div>
      </div>
    </div>
    <div class="review-comments">
      <div class="flex flex-col gap-4" v-for="item in 5" :key="item">
        <div class="review-header">
          <p>⭐⭐⭐⭐⭐</p>
          <p><span class="font-black">投稿者 MI</span> 投稿日 2025年6月7日</p>
        </div>

        <p>サイズ：one | 色：OFF</p>

        <div class="review-content">
          <p>甘いかなーと思いつつ試着してみたら全然大丈夫でした。</p>
          <p>いろんな着方ができるのでたくさん着回します！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.review-container {
  padding: var(--space-lg);
  background-color: #e4e4e4;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.rating-bar {
  display: flex;
  flex-direction: column;
  //   align-items: center;
  gap: 8px;
  font-size: 14px;
  position: relative;
  margin-block: var(--space-sm);
  margin-inline: var(--space-lg);

  .bar {
    width: 100%;
    height: 1px; /* 條狀高度 */
    background: #dcdcdc;
    overflow: hidden;
  }

  .ticks {
    position: absolute;
    top: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    display: flex;
    justify-content: space-evenly;

    span {
      width: 1px;
      height: 6px;
      background: #999; /* 刻度顏色 */
    }
  }
}

.label {
  font-size: 0.6875rem;
}

.hist-bar {
  margin-block: var(--space-sm);
  margin-inline: var(--space-lg);

  > div {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    gap: 0.5rem;
    margin-block: var(--space-sm);
  }

  span {
    min-width: 38px;
    text-align: right;
    font-size: 0.6875rem;
  }

  .bar {
    max-width: 200px;
    position: relative;
    flex: 1;
    height: 14px;
    background: #eee;
    overflow: hidden;
  }

  .fill {
    // width: 40%;
    height: 100%;
    background-color: #747474;
    transition: width 0.3s ease;
  }
}

.review-comments {
  padding-block: 24px;

  > div {
    border-top: 1px solid #e4e4e4;
    padding-block: 1.5rem;
  }
}

.review-header {
}

.review-comments {
}
</style>
