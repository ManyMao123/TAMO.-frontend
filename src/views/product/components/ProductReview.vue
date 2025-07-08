<script setup lang="ts">
import { ref, computed } from 'vue'
withDefaults(defineProps<{ text?: string }>(), { text: '' })

const commentList = ref([
  {
    id: 1,
    writer: 'MI',
    date: '2025年6月7日',
    stars: 5,
    text: '甘いかなーと思いつつ試着してみたら全然大丈夫でした。\nいろんな着方ができるのでたくさん着回します！',
    sizeFeel: 1
  },
  {
    id: 2,
    writer: 'bb',
    date: '2025年5月27日',
    stars: 3,
    text: '少し大きめでしたが、パンツの形が綺麗で感動しました！\n一回おってもシルエットもあまり変わらずだぼっとしていてかわいいです。',
    sizeFeel: 2
  },
  {
    id: 3,
    writer: 'm.',
    date: '2025年5月19日',
    stars: 4,
    text: 'セットアップでも単体でも着られるので、購入して良かったです！パンツはウエストゴムで楽に履けるし、これからどんどん着たいと思います。',
    sizeFeel: 1
  },
  {
    id: 4,
    writer: 'ayumi',
    date: '2025年7月2日',
    stars: 5,
    text: 'インナー次第で色々楽しめそうです。\nバックのデザインがとても可愛くて購入しました。',
    sizeFeel: 1
  },
  {
    id: 5,
    writer: 'ry',
    date: '2025年6月28日',
    stars: 5,
    text: 'パンツのウエストがゴムになっているので履きやすく形もキレイ。上服は他の物にも合わせやすい。',
    sizeFeel: 1
  },
  {
    id: 6,
    writer: 'penguin',
    date: '2025年6月19日',
    stars: 5,
    text: '一目惚れです！！！！\n何よりパンツが履きやすく、楽ちんなのに身体を綺麗に見せてくれるセットアップでした。\nしわにも思ったよりなりにくくていいです。',
    sizeFeel: 1
  },
  {
    id: 7,
    writer: 'mano',
    date: '2025年6月6日',
    stars: 4,
    text: 'パンツの履き心地が凄く良いです！形も綺麗。\nトップスはノースリーブでまだ着れないのでTシャツ重ねてます。\n腕周りのあきも広いので重ね着しやすいです。',
    sizeFeel: 1
  }
])

const totalComments = computed(() => commentList.value.length)

const averageStars = computed(() => {
  const totalStars = commentList.value.reduce((sum, comment) => sum + comment.stars, 0)
  return (totalStars / commentList.value.length).toFixed(1)
})

// 顯示星星數
function getStarsString(stars: number) {
  const rounded = Math.round(stars)
  return '⭐️'.repeat(rounded)
}

// 轉換星星數成百分比單位
function ratingToPercent(stars: number | string) {
  const clamped = Math.min(Math.max(Number(stars), 0), 5)
  return (clamped / 5) * 100
}

// 尺寸合身度總體計算
const sizeFeelStats = computed(() => {
  const stats: Record<number, number> = {
    0: 0, // 太小
    1: 0, // 剛好
    2: 0 // 太大
  }

  commentList.value.forEach(comment => {
    stats[comment.sizeFeel]++
  })

  const total = commentList.value.length
  const toPercent = (count: number) => (total ? Math.round((count / total) * 100) : 0)

  return [
    { label: '太小', count: stats[0], percent: toPercent(stats[0]) },
    { label: '剛好', count: stats[1], percent: toPercent(stats[1]) },
    { label: '太大', count: stats[2], percent: toPercent(stats[2]) }
  ]
})

// 尺寸合身度轉換中文
function getSizeFeelLabel(value: number) {
  const map = {
    0: '太小',
    1: '剛好',
    2: '太大'
  } as const

  return map[value as 0 | 1 | 2] ?? '-'
}

// 分頁器
const pageSize = 3
const currentPage = ref(1)

const totalItems = computed(() => commentList.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize))

const currentComments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return commentList.value.slice(start, end)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div>
    <div class="review-container flex flex-col gap-2">
      <p>總體評價</p>
      <p>
        {{ getStarsString(Math.round(Number(averageStars))) }} {{ averageStars }} （共
        {{ totalComments }}
        則評論）
      </p>

      <p>使用感</p>
      <div class="rating-bar">
        <div class="bar">
          <div class="dot" :style="{ left: `${ratingToPercent(averageStars)}%` }"></div>
        </div>
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
        <div v-for="(item, idx) in sizeFeelStats" :key="idx">
          <span>{{ item.label }}</span>
          <div class="bar">
            <div class="fill" :style="{ width: item.percent + '%' }"></div>
          </div>
          <span>{{ item.count }}人</span>
          <span>{{ item.percent }}%</span>
        </div>
      </div>
    </div>
    <div class="review-comments">
      <div class="flex flex-col gap-4" v-for="item in currentComments" :key="item.id">
        <div class="review-header">
          <p>{{ getStarsString(item.stars) }}</p>
          <p>
            <span class="font-black">投稿者 {{ item.writer }}</span> 投稿日 {{ item.date }}
          </p>
        </div>

        <p>サイズ：one | 色：OFF</p>

        <div class="review-content">
          <p v-for="(line, idx) in item.text.split('\n')" :key="idx">{{ line }}</p>
        </div>

        <div class="review-option">
          <p>尺寸合身度：{{ getSizeFeelLabel(item.sizeFeel) }}</p>
        </div>
      </div>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">← 上一頁</button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>

        <button @click="nextPage" :disabled="currentPage === totalPages">下一頁 →</button>
      </div>
    </div>

    <div class="review-disclaimer">
      <p>※以上評論為顧客個人意見，並不代表商品實際效果。</p>
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
  gap: 8px;
  font-size: 14px;
  position: relative;
  margin-block: var(--space-sm);
  margin-inline: var(--space-lg);

  .bar {
    position: relative;
    width: 100%;
    height: 1px;
    background: #dcdcdc;
    overflow: visible;
  }

  .dot {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: var(--secondary-color);
    border-radius: 50%;
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
    height: 100%;
    background-color: #747474;
    transition: width 0.3s ease;
  }
}

.review-comments {
  padding-top: 24px;

  > div {
    border-top: 1px solid #e4e4e4;
    padding-block: 1.5rem;
  }

  .review-option {
    color: #747474;
    font-size: 0.625rem;
  }
}

// .review-header {
// }

// .review-content {
// }

.review-disclaimer {
  color: #747474;
  font-size: 0.625rem;
}

.pagination {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  button {
    padding: var(--space-xs) var(--space-sm);
    border: 1px solid var(--light-gray);
    border-radius: 4px;
    cursor: pointer;
    color: #747474;
    font-weight: bold;

    &:hover {
      background-color: var(--light-gray);
      border-color: #8b8b8b;
    }

    &.active {
      border: 2px solid var(--secondary-color);
      color: var(--secondary-color);
    }

    &:disabled {
      pointer-events: none;
      border: none;
      cursor: auto;
      color: #a0a0a0;
    }
  }
}
</style>
