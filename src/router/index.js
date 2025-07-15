// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/Home.vue'
import CatalogPage from '../pages/CatalogPage.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductPage from '../pages/ProductPage.vue'
import CompanyPage from '../pages/CompanyPage.vue'
import Account from '../pages/Account.vue'
import CartPage from '../pages/CartPage.vue'
import CheckoutPage from '../pages/CheckoutPage.vue'
import OrderSuccessPage from '../pages/OrderSuccessPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegistrPage from '../pages/RegistrPage.vue'




const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogPage
  },
  {
    path: '/product',
    name: 'products',
    component: ProductCard
  },
  {
    path: '/catalog/:id',
    name: 'product_card',
    component: ProductPage,
    props: true
  },
    {
    path: '/company',
    name: 'company',
    component: CompanyPage
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage
  },
  {
    path: '/order-success',
    name: 'order-success',
    component: OrderSuccessPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/registr',
    name: 'registr',
    component: RegistrPage
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router