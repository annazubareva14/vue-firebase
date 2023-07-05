<template>
  <div>
    <div :class="['openhour', { '--open': isOpen }, { '--closed': isClosed }]">
      {{ day }} {{ open }} - {{ close }} Uhr
    </div>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script setup>
import moment from 'moment/min/moment-with-locales'
import { computed } from 'vue'

moment.locale('de')

const props = defineProps({
  day: String,
  open: String,
  close: String,
  isClosed: Boolean,
  message: String
})

const emit = defineEmits(['checkOpen'])

const isOpen = computed(() => {
  const currentTime = moment().format('HH')
  const currentDay = moment().format('dddd')

  const isOpenSoon = props.open > currentTime
  const isAlreadyClosed = props.close <= currentTime

  emit('checkOpen', isOpenSoon, isAlreadyClosed, props.day)

  return !isAlreadyClosed && !isOpenSoon && props.day === currentDay
})
</script>

<style lang="scss" scoped>
.openhour {
  &.--open {
    color: #083b4b;
    font-size: 16px;
    font-weight: 600;
  }

  &.--closed {
    color: red;
  }
}
</style>
