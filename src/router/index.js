import { createRouter, createWebHistory } from 'vue-router'

import AuthorizationView from '@/views/AuthorizationView.vue'
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: '/',
    name: 'authorization',
    component: AuthorizationView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


