import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '@/firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'
import { router } from '@/router/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  async function register(email: string, password: string) {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    if (response) {
      user.value = response.user
      router.push({ name: 'GamePreparation' })
    } else {
      throw new Error('Unable to register user')
    }
  }

  async function logIn(email: string, password: string) {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (response) {
      user.value = response.user
      router.push({ path: '/' })
    } else {
      throw new Error('login failed')
    }
  }

  async function logOut() {
    await signOut(auth)
    user.value = null
  }

  return { user, register, logIn, logOut }
})
