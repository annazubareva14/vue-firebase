<template>
  <button class="base-button" role="button" @click="emit('click')">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: String
})

const emit = defineEmits(['click'])
</script>

<style lang="scss">
.base-button {
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  padding: 16px 23px;
  position: relative;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.base-button:hover,
.base-button:active {
  outline: 0;
}

.base-button:hover {
  background-color: transparent;
  cursor: pointer;
}

.base-button:before {
  background-color: #d5edf6;
  border-radius: 20px;
  content: '';
  height: calc(100% + 3px);
  position: absolute;
  right: -4px;
  top: -6px;
  transition: all 250ms ease-in;
  width: 100%;
  z-index: -1;
}

.base-button:hover:before {
  background-color: #6dcff6;
  right: -7px;
  top: -9px;
}

@media (min-width: 768px) {
  .base-button {
    padding: 16px 32px;
  }
}
</style>
