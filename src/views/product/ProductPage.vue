<script setup lang="ts">
import { ref } from 'vue'
import BaseBreadCrumb from '@/components/BaseBreadCrumb.vue'
import productImages from '@/assets/images/products/P4167'
import numeral from 'numeral'
import ProductOptions from '@/views/product/components/ProductOptions.vue'
import ProductReview from '@/views/product/components/ProductReview.vue'
import StaffStyling from '@/views/product/components/StaffStyling.vue'
import { computed } from 'vue'
import BaseCollapse from '@/components/BaseCollapse.vue'
import BaseButton from '@/components/BaseButton.vue'
// import type { Product } from '@/types/models/product'

const typeMap = new Map<string, { type: string; id: string; img: string[] }>()

productImages.forEach(path => {
  const cleanedPath = path.split('?')[0]
  const match = cleanedPath.match(/_(\w+)\.(jpe?g|png|webp)$/i)
  const type = match?.[1]
  if (!type) return

  if (!typeMap.has(type)) {
    typeMap.set(type, { type, id: type, img: [path] })
  } else {
    typeMap.get(type)!.img.push(path)
  }
})

const productMocks = Array.from(typeMap.values())

// 選擇樣式
const currentTypeIndex = ref(0)
const selectType = (index: number) => {
  console.log(index)
  currentTypeIndex.value = index
  // 小照需回到第一個
  currentImgIndex.value = 0
}

const currentImgIndex = ref(0)
const imgTotalLength = computed(() => productMocks[currentTypeIndex.value].img.length)
// 直接點擊圖片切換
const selectImg = (index: number) => {
  console.log(index)
  currentImgIndex.value = index
}
// 往前按鈕圖片切換
function showPrevImage() {
  currentImgIndex.value = (currentImgIndex.value - 1 + imgTotalLength.value) % imgTotalLength.value
}
// 往後按鈕圖片切換
function showNextImage() {
  currentImgIndex.value = (currentImgIndex.value + 1) % imgTotalLength.value
}
</script>

<template>
  <div class="flex flex-col gap-8 mx-auto max-w-[1300px]">
    <!-- 麵包屑 -->
    <BaseBreadCrumb class=""></BaseBreadCrumb>

    <div class="grid grid-cols-2 gap-20">
      <div class="flex flex-col gap-10">
        <div class="product-pic">
          <div class="img-previewer">
            <div class="img-previewer__pagination">
              <span>{{ currentImgIndex + 1 }}</span>
              <span>/</span>
              <span>{{ imgTotalLength }}</span>
            </div>

            <img :src="productMocks[currentTypeIndex].img[currentImgIndex]" alt="" />
            <div class="img-previewer__prev" @click="showPrevImage"></div>
            <div class="img-previewer__next" @click="showNextImage"></div>
          </div>

          <div>
            <p class="product-pic__type">IVORY</p>
            <p class="product-pic__model">身高 : 162cm 尺寸 : one</p>
          </div>

          <!-- 款式選擇 -->
          <div class="img-selector">
            <div
              v-for="(item, index) in productMocks"
              :key="item.id"
              @click="selectType(index)"
              class="h-[66px]"
            >
              <img :src="item.img[0]" :class="{ 'is-selected': currentTypeIndex === index }" />
              <p>{{ item.type.toUpperCase() }}</p>
            </div>
          </div>

          <!-- 商品細節照片-->
          <div class="h-[66px] flex gap-2">
            <img
              v-for="(item, index) in productMocks[currentTypeIndex].img"
              :key="index"
              :src="item"
              :class="{ 'is-selected': currentImgIndex === index }"
              @click="selectImg(index)"
              alt=""
            />
          </div>
        </div>
        <!-- 店員實穿分享 -->
        <StaffStyling />
      </div>

      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-10 justify-between">
          <div class="product-info">
            <div>
              <p class="product-info__name">『UR TECH』ポケッタブル撥水フレアパーカー</p>
              <p class="product-info__price">{{ '$' + numeral(1650).format('0,0') }}</p>
            </div>
            <p class="product-info__rating">
              ⭐⭐⭐⭐<a href="#review-section">（共 7 則評論）</a>
            </p>
            <p class="product-info__favorites">收藏數 333</p>

            <div class="product-info__caption flex flex-col gap-1">
              <p>購物可獲得<span> 90 點 </span> 回饋（須註冊並登入會員後購買）</p>
              <p>全館<span> 免運費 </span>配送</p>
              <p>13:00 前下單<span> 最快當日出貨 </span></p>
              <p>提供禮品包裝服務</p>
              <p>關於退貨政策</p>
            </div>
          </div>

          <div class="flex flex-col gap-8">
            <ProductOptions :img="productMocks[0].img[0]" :text="productMocks[0].type" />
            <ProductOptions :img="productMocks[1].img[0]" :text="productMocks[1].type" />
            <ProductOptions :img="productMocks[2].img[0]" :text="productMocks[2].type" />
            <div class="flex justify-end gap-4">
              <BaseButton plain>查看門市庫存</BaseButton>
              <BaseButton plain>線上造型諮詢</BaseButton>
            </div>
          </div>
        </div>
        <!-- 商品資訊(文字) -->
        <div>
          <BaseCollapse :title="'商品說明'" :preview="true">
            <p>
              カジュアルコーデに華を添えるトップス
              前身頃にテープ状の共布でギャザーをあしらったワイドシャツ。どこか上品で甘さは控えめ、大人も手に取りやすいフリルのデザインです。ノーカラーなのでかしこまりすぎず、程よくラフな印象で着用いただけます。リネンならではの肌離れの良さと爽やかなタッチがこれからの季節に快適。前開きなので羽織ることもでき、上からカーディガンやジャケットを合わせるスタイリングもおすすめです。いつものボトムを合わせるだけで新鮮な装いが叶います。
            </p>
          </BaseCollapse>
          <BaseCollapse :title="'尺寸'">
            <table class="size-chart">
              <thead>
                <tr>
                  <th></th>
                  <th>肩幅</th>
                  <th>総丈</th>
                  <th>身幅</th>
                  <th>袖丈</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>one</td>
                  <td>38cm</td>
                  <td>48cm</td>
                  <td>52cm</td>
                  <td>34cm</td>
                </tr>
              </tbody>
            </table>
          </BaseCollapse>
          <BaseCollapse :title="'商品資訊'">
            <div class="product-description">
              <dl>
                <dt>商品編號</dt>
                <dd>LAA5-22R001</dd>
              </dl>
              <dl>
                <dt>尺寸</dt>
                <dd>FREE</dd>
              </dl>
              <dl>
                <dt>材質</dt>
                <dd>棉 50%、嫘縈 38%、醋酸纖維 12%</dd>
              </dl>
              <dl>
                <dt>產地</dt>
                <dd>台灣</dd>
              </dl>
              <dl>
                <dt>洗滌方式</dt>
                <dd>可機洗、可乾洗 ※詳情請參閱商品內部的洗滌標示標籤</dd>
              </dl>
              <dl>
                <dt>分類</dt>
                <dd>上衣／針織外套</dd>
              </dl>
            </div>
          </BaseCollapse>
          <BaseCollapse :title="'商品評論'" :default-expanded="true" id="review-section">
            <ProductReview />
          </BaseCollapse>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  height: 100%;
}

.product-pic {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__type {
  }
  &__model {
  }
}

.img-previewer {
  position: relative;

  &__pagination {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20px;
    left: auto;
    right: 0;
    min-width: 32px;
    height: 70px;
    background: rgba(255, 255, 255, 0.75);
    color: #333333;
    line-height: 1;
    z-index: 1;
    gap: var(--space-sm);

    span {
      color: var(--secondary-color);
      // writing-mode: vertical-rl;
      // text-orientation: upright;
      // white-space: nowrap;
      font-size: 0.75rem;
    }
  }

  &__prev,
  &__next {
    position: absolute;
    width: 30px;
    height: 60px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3333;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }

  &__prev {
    left: 0;

    &::after {
      content: '';
      position: absolute;
      display: block;
      top: 23px;
      left: 12px;
      width: 11px;
      height: 11px;
      border-top: solid 2px;
      border-right: solid 2px;
      transform: rotate(-135deg);
      color: #747474;
    }
  }

  &__next {
    right: 0;

    &::after {
      content: '';
      position: absolute;
      display: block;
      top: 23px;
      right: 11px;
      width: 11px;
      height: 11px;
      border-top: solid 2px;
      border-right: solid 2px;
      transform: rotate(45deg);
      color: #747474;
    }
  }
}

.img-selector {
  display: flex;
  gap: 0.5rem;
  margin-block: 1.5rem;

  img {
    cursor: pointer;

    &.is-selected {
      outline: 1px solid #333;
    }
  }

  p {
    font-size: 0.75rem;
  }
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__name {
    font-size: 1.25rem;
    font-weight: bold;
  }

  &__price {
    font-size: 2.125rem;
  }

  &__rating {
    font-size: 0.75rem;
  }
  &__favorites {
    font-size: 0.875rem;
    font-weight: bold;
  }

  &__caption {
    font-size: 0.75rem;

    span {
      color: var(--accent-color);
    }
  }
}

/** 尺寸表 */
.size-chart {
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 1px;
  width: 100%;

  th,
  td {
    height: 30px;
    text-align: center;
    vertical-align: middle;
  }

  thead tr th {
    background-color: #747474;
    color: #fff;
  }

  tbody tr th {
    background-color: #f4f4f4;
  }
}

/** 商品資訊 */
.product-description {
  dl {
    display: grid;
    grid-template-columns: 120px 1fr; /* 左欄 120px，右欄自動填滿 */
    column-gap: 12px;
    align-items: center;
    padding: 18px 20px;

    &:nth-child(odd) {
      background-color: #f4f4f4;
    }
    &:nth-child(even) {
      background-color: #e8e8e8;
    }
  }
}
</style>
