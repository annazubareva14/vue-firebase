<template>
  <div class="weather__wrapper">
    <h1>Wetterbericht</h1>
    <div class="weather">
      <div class="weather__info">
        <h2>Deggendorf</h2>

        <div>Lufttemperatur: {{ Math.floor(weather.airTemperature) }}</div>
        <div>Wassertemperatur: {{ Math.floor(weather.waterTemperature) }}</div>
      </div>
      <div class="weather__grad">
        <div>{{ Math.floor(weather.currentWeather) }}°C</div>
        <img :src="weather.currentWeatherImage" alt="weather" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weather: Object
})
</script>

<style lang="scss">
.weather {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__wrapper {
    padding: 25px 0;
    border-bottom: 1px solid gray;
  }

  &__grad {
    font-size: 48px;
    text-align: center;
    line-height: 20px;

    img {
      width: 70px;
    }
  }
}
</style>
