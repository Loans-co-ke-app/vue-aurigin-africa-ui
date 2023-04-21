import type { RouteRecordRaw } from 'vue-router'

const chatRouter: RouteRecordRaw = {
  path: '/chat',
  name: 'chat',
  component: () => import('@/layouts/ChatLayout.vue')
}

export default chatRouter
