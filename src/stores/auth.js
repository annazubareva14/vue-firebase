import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '@/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuth = defineStore('auth', () => {
  const user = reactive({
    isLoggedIn: false,
    data: null
  })

  async function register({ name, email, password }) {
    try {
      await setPersistence(auth, browserLocalPersistence)

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
      await setPersistence(auth, browserLocalPersistence)
      
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

  function fetchUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.data = user
        user.isLoggedIn = true
      } else {
        user.data = null
        user.isLoggedIn = false
      }
    })
  }

  return { user, register, login, logout, fetchUser }
})
