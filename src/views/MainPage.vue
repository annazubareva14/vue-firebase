<template>
  <div class="main">
    <Header :email="user?.data?.email" @logout="logout" />
    <CurrentWeather :weather="weather" />

    <OpenTime :open-hours="openHours" />
    <Traffic :traffic="traffic" />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import CurrentWeather from '@/components/CurrentWeather.vue'
import OpenTime from '@/components/OpenTime.vue'
import Traffic from '@/components/Traffic.vue'
import { onMounted, onBeforeMount } from 'vue'
import { useAuth } from '@/stores/auth.js'
import { useWeather } from '@/stores/weather.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import openHours from '@/mockData/openHours.json'
import traffic from '@/mockData/traffic.json'

const router = useRouter()

const storeAuth = useAuth()
const storeWeather = useWeather()
const { user } = storeToRefs(storeAuth)
const { weather } = storeToRefs(storeWeather)

onBeforeMount(() => {
  storeAuth.fetchUser()
})

onMounted(async () => {
  await storeWeather.getWeatherData()
})

const logout = async () => {
  await storeAuth.logout()
  router.push('/login')
}
</script>

<style lang="scss">
.main {
  background-color: #f0f8ff63;
  padding: 20px;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;

  &:hover {
    padding: 25px;
    background-color: #f0f8ff7a;
  }
}
</style>
