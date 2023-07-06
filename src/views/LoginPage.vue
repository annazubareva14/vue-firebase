<template>
  <div>
    <LoginForm
      v-model:email="userData.email"
      v-model:password="userData.password"
      :error="errorMsg"
      is-login-page
      @submit="loginUser"
    />
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { useAuth } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const storeAuth = useAuth()

const { errorMsg } = storeToRefs(storeAuth)

const userData = reactive({
  email: '',
  password: ''
})

const loginUser = async () => {
  try {
    await storeAuth.login(userData)
    router.push('/')
  } catch (err) {
    console.error(err)
    
  }
}
</script>