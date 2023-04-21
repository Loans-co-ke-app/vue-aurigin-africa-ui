import { createRouter, createWebHistory } from 'vue-router'
import chatRouter from './chat.routes'
import baseRouter from './base.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [baseRouter, chatRouter]
})

export default router
