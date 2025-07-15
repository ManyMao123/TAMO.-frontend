import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/homepage/HomePage.vue'
import ProductPage from '@/views/product/ProductPage.vue'
import LoginPage from '@/views/login/LoginPage.vue'

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
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
