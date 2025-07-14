import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/homepage/HomePage.vue'
import ProductPage from '@/views/product/ProductPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
