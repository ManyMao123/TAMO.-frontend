<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  minValue?: number
  maxValue?: number
  modelValue: { min: number; max: number }
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const MIN_PRICE = props.minValue ?? 0
const MAX_PRICE = props.maxValue ?? 10000

const internalRange = ref({ ...props.modelValue })

watch(
  () => props.modelValue,
  val => {
    internalRange.value = { ...val }
  }
)

// 拖曳相關邏輯
const sliderRef = ref<HTMLElement | null>(null)
const sliderWidth = ref(0)
const dragging = ref<'min' | 'max' | null>(null)
const isDragging = ref(false)

const minPercent = computed(
  () => ((internalRange.value.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
)
const maxPercent = computed(
  () => ((internalRange.value.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
)

onMounted(() => {
  if (sliderRef.value) {
    sliderWidth.value = sliderRef.value.offsetWidth
  }
})

// 計算點擊/拖曳的位置取整後的數值
function calcPriceByPos(clientX: number): number | null {
  if (!sliderRef.value || sliderWidth.value === 0) return null

  const rect = sliderRef.value.getBoundingClientRect()
  let posX = clientX - rect.left
  posX = Math.min(Math.max(0, posX), sliderWidth.value)

  const percent = (posX / sliderWidth.value) * 100
  const price = MIN_PRICE + ((MAX_PRICE - MIN_PRICE) * percent) / 100

  const step = 100
  return Math.round(price / step) * step
}

// 開始拖曳
function onPointerDown(type: 'min' | 'max', event: PointerEvent) {
  event.preventDefault()
  dragging.value = type
  isDragging.value = true

  // 確保事件被鎖定在這個元素上
  ;(event.target as HTMLElement).setPointerCapture(event.pointerId)

  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value || !sliderRef.value || sliderWidth.value === 0) return

  const priceStep = calcPriceByPos(event.clientX)
  if (!priceStep) return

  if (dragging.value === 'min') {
    internalRange.value.min = Math.min(priceStep, internalRange.value.max)
  } else {
    internalRange.value.max = Math.max(priceStep, internalRange.value.min)
  }

  emit('update:modelValue', { ...internalRange.value })
}

// 結束拖曳
function onPointerUp(event: PointerEvent) {
  console.log('pointer up')
  dragging.value = null
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)

  // 拖曳結束後等一點時間再把 flag 清掉，避免 click 立刻觸發
  setTimeout(() => (isDragging.value = false), 0)
}

function onTrackClick(event: MouseEvent) {
  if (isDragging.value || !sliderRef.value || sliderWidth.value === 0) return

  const priceStep = calcPriceByPos(event.clientX)
  if (!priceStep) return

  // 判斷點擊位置離 min 或 max 哪個更近
  const distMin = Math.abs(priceStep - internalRange.value.min)
  const distMax = Math.abs(priceStep - internalRange.value.max)

  if (distMin < distMax) {
    // 移動 min，且不超過 max
    internalRange.value.min = Math.min(priceStep, internalRange.value.max)
  } else {
    // 移動 max，且不低於 min
    internalRange.value.max = Math.max(priceStep, internalRange.value.min)
  }

  emit('update:modelValue', { ...internalRange.value })
}
</script>

<template>
  <div ref="sliderRef" class="range-slider" @click="onTrackClick">
    <div
      class="range-slider__ball"
      :style="{ left: minPercent + '%' }"
      @pointerdown="e => onPointerDown('min', e)"
    ></div>
    <div class="range-slider__line"></div>
    <div
      class="range-slider__ball"
      :style="{ left: maxPercent + '%' }"
      @pointerdown="e => onPointerDown('max', e)"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.range-slider {
  position: relative;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &__line {
    width: 100%;
    height: 1px;
    border: 1px solid var(--secondary-color);
  }

  &__ball {
    border: 1px solid var(--secondary-color);
    background: var(--white);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
</style>
