<template>
  <div>
    <LoginForm
      v-model:name="userData.name"
      v-model:email="userData.email"
      v-model:password="userData.password"
      @submit="registerUser"
    />
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
import { reactive } from 'vue'
import { useAuth } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const storeAuth = useAuth()

const userData = reactive({
  name: '',
  email: '',
  password: ''
})

const registerUser = async () => {
  try {
    await storeAuth.register(userData)
    router.push('/')
  } catch (err) {
    console.error(err)
  }
}
</script>
