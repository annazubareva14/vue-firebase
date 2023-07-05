import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '@/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth'

export const useAuth = defineStore('auth', () => {
  const user = reactive({
    isLoggedIn: false,
    data: null
  })

  async function register({ name, email, password }) {
    try {
      await setPersistence(auth, browserSessionPersistence)

      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response) {
        user.data = response.user
        user.isLoggedIn = true
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function login({ email, password }) {
    try {
      await setPersistence(auth, browserSessionPersistence)
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        user.data = response.user
        user.isLoggedIn = true
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function logout() {
    await signOut(auth)
    user.data = null
  }

  return { user, register, login, logout }
})
