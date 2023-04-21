import type { RouteRecordRaw } from 'vue-router'

const baseRouter: RouteRecordRaw = {
  path: '/',
  name: 'index',
  component: () => import('@/views/HomeView.vue')
}

export default baseRouter
