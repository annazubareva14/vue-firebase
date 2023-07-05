import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/MainPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegistrationPage.vue')
    },
  ]
})

router.beforeEach((to) => {
  const store = useAuth()

  if (to.meta.requiresAuth && !store.user.isLoggedIn) return '/login'
})

export default router
