import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem } from '@/types/models/cart.types.ts'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref([] as CartItem[])

    const totalQuantity = computed(() =>
      cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
    )
    const totalPrice = computed(() =>
      cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    function addItem(product: Omit<CartItem, 'quantity'>, quantity = 1) {
      const existing = cartItems.value.find(i => i.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        cartItems.value.push({ ...product, quantity })
      }
    }

    function removeItem(id: string) {
      const removeTargetIndex = cartItems.value.findIndex(i => i.id === id)
      cartItems.value.splice(removeTargetIndex, 1)
    }

    function updateQuantity(id: string, quantity: number) {
      const item = cartItems.value.find(i => i.id === id)
      if (!item) return

      if (quantity <= 0) {
        removeItem(id)
      } else {
        item.quantity = quantity
      }
    }

    function clearCart() {
      cartItems.value = []
    }

    return { cartItems, totalQuantity, totalPrice, addItem, removeItem, updateQuantity, clearCart }
  },
  { persist: true }
)
