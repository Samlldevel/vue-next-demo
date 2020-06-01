import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: () => import('@/views/TodoList.vue')
  },
  {
    path: '/SVGDemo',
    name: 'SVGDemo',
    component: () => import('@/views/SVGDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
