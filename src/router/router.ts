import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Game from '@/views/Game.vue'
import GamePreparation from '@/views/GamePreparation.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'GamePreparation',
    component: GamePreparation,
    meta: { requiresAuth: true }
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStroe = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStroe.user) {
      return next({ name: 'Login' })
    }
    next()
  } else {
    next()
  }
})
