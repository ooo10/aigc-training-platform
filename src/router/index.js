import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/register', component: () => import('../views/Register.vue') },
  { path: '/teacher', component: () => import('../views/TeacherDashboard.vue') },
  { path: '/student', component: () => import('../views/StudentWorkspace.vue') }
]

const router = createRouter({
  history: createWebHistory('/aigc-training-platform/'),
  routes
})

export default router