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
import { FirebaseError } from 'firebase/app'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  async function register(email: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response) {
        user.value = response.user
        router.push({ name: 'GamePreparation' })
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new Error(error.code)
      }
    }
  }

  async function logIn(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        user.value = response.user
        router.push({ name: 'GamePreparation' })
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new Error(error.code)
      }
    }
  }

  async function logOut() {
    await signOut(auth)
    user.value = null
    router.push({ name: 'Login' })
  }

  return { user, register, logIn, logOut }
})
