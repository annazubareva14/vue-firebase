<template>
  <div v-if="currentTraffic" class="traffic">
    <h1>Besucheraufkommen</h1>
    <div
      v-for="(status, index) in trafficStatus"
      :key="index + Math.random()"
      class="traffic__info"
    >
      <span :class="['traffic__title', { '--current': currentTraffic == status }]">
        {{ status }}
      </span>
      <div class="traffic__scale">
        <div :class="['traffic__scale', currentStyle(status)]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import { computed } from 'vue'

const props = defineProps({
  traffic: Object
})

const trafficStatus = ['wenig', 'mittel', 'hoch']

const currentTraffic = computed(() => {
  const currentDay = moment().format('dddd')
  const currentTime = moment().format('HH')
  const changes = props.traffic[currentDay].changes
  return changes ? changes[currentTime] : props.traffic[currentDay][currentTime]
})

const currentStyle = (status) => {
  return (
    (status === 'wenig' && '--small') ||
    (status === 'mittel' && '--middle') ||
    (status === 'hoch' && '--high')
  )
}
</script>

<style lang="scss">
.traffic {
  &__info {
    display: flex;
    align-items: center;
  }
  &__title {
    width: 70px;
    &.--current {
      color: #083b4b;
      font-size: 16px;
      font-weight: 600;
    }
  }

  &__scale {
    display: block;
    height: 20px;
    background-color: #004143;
    &.--small {
      width: 30px;
    }
    &.--middle {
      width: 50px;
    }
    &.--high {
      width: 100px;
    }
  }
}
</style>
