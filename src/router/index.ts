import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/homepage/HomePage.vue'
import ProductPage from '@/views/product/ProductPage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import ProductOverview from '@/views/product-overview/ProductOverview.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/products',
    name: 'ProductOverview',
    component: ProductOverview
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
