<template>
  <div class="opentime">
    <h1>Öffnungszeiten</h1>
    <OpenTimeItem
      v-for="(day, key) in openHours"
      :key="key + Math.random()"
      :day="day.name"
      :open="day.changes?.open || day.open"
      :close="day.changes?.close || day.close"
      :message="day.changes?.message"
      :is-closed="isClosed"
      @checkOpen="setNextOpenDay"
    />
    <div v-if="nextOpen">Öffnet demnächst: {{ nextOpen.name }} {{ nextOpen.open }} Uhr</div>
  </div>
</template>

<script setup>
import OpenTimeItem from '@/components/OpenTimeItem.vue'
import moment from 'moment'
import momentDe from 'moment/min/moment-with-locales'
import { ref } from 'vue'

momentDe.locale('de')

const props = defineProps({
  openHours: Object
})

const isClosed = ref(false)
const nextOpen = ref(null)

const setNextOpenDay = (isOpenSoon, isAlreadyClosed, weekday) => {
  const currentDay = moment().format('dddd')
  const currentDayDe = momentDe().format('dddd')
  let day

  if ((isOpenSoon || isAlreadyClosed) && weekday === currentDayDe) {
    isClosed.value = true
  }

  if (isOpenSoon) {
    day = Object.keys(props.openHours)[Object.keys(props.openHours).indexOf(currentDay)]
    nextOpen.value = props.openHours[day]['changes'] || props.openHours[day]
  } else if (isAlreadyClosed) {
    const nextOpenIndex = `${Object.keys(props.openHours).indexOf(currentDay) + 1}`

    nextOpenIndex >= Object.keys(props.openHours).length
      ? (day = Object.keys(props.openHours)[0])
      : (day = Object.keys(props.openHours)[
          `${Object.keys(props.openHours).indexOf(currentDay) + 1}`
        ])
    nextOpen.value = props.openHours[day]['changes'] || props.openHours[day]
  }
}
</script>

<style lang="scss">
.opentime {
  padding: 25px 0;
}
</style>
