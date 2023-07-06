import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { auth, persistencePromise } from '@/plugins/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuth = defineStore('auth', () => {
  const user = reactive({
    isLoggedIn: false,
    data: null
  })

  const errorMsg = ref(null)

  async function register({ name, email, password }) {
    try {
      await persistencePromise

      const response = await createUserWithEmailAndPassword(auth, email, password)
      response.user.displayName = name

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
      await persistencePromise

      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        user.data = response.user
        user.isLoggedIn = true
      }
    } catch (err) {
      console.error(err)
      switch (err.code) {
        case 'auth/wrong-password':
          errorMsg.value = 'Falsches Passwort'
          break
        case 'auth/user-not-found':
          errorMsg.value = 'Leider konnten wir kein Konto mit dieser E-Mail-Adresse finden.'
          break
        default:
          errorMsg.value = 'E-Mail-Addresse oder Passwort falsch'
          break
      }
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

  return { user, errorMsg, register, login, logout, fetchUser }
})
