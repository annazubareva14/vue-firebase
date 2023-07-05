import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { axios } from '@/api/index.js'

export const useWeather = defineStore('weather', () => {
  const weather = reactive({
    currentWeather: null,
    currentWeatherImage: null,
    waterTemperature: null,
    airTemperature: null
  })

  const getWeatherData = async () => {
    try {
      const { data } = await axios.get('/weather', {
        params: { q: 'Deggendorf', units: 'metric', appid: import.meta.env.VITE_WEATHER_API_KEY }
      })

        weather.currentWeather = data.main.temp,
        weather.currentWeatherImage = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        weather.waterTemperature = data.main.temp_min,
        weather.airTemperature = data.main.feels_like
    } catch (err) {
      console.error(err)
    }
  }

  return { weather, getWeatherData }
})
