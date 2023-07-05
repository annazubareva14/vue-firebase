<template>
  <div class="header">
    <div class="header__title">
      Willkommen,
      <h3>{{ email }}</h3>
    </div>
    <BaseButton text="log out" @click="emit('logout')" />
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
defineProps({
  email: String
})

const emit = defineEmits(['logout'])
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
  border-bottom: 1px solid gray;
  flex-direction: column;

  @media screen and (min-width: 720px) {
    flex-direction: row;
  }

  &__title {
    margin-bottom: 20px;

    @media screen and (min-width: 720px) {
      margin-bottom: 0;
    }
  }
}
</style>
