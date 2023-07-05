<template>
  <div class="login-form">
    <h1 class="login-form__title">{{ isLoginPage ? 'Sign in' : 'Sign up' }}</h1>
    <div class="login-form__form">
      <div v-if="!isLoginPage" class="login-form__field">
        <label for="name">Name</label>
        <input id="name" :value="name" @input="$emit('update:name', $event.target.value)" />
      </div>

      <div class="login-form__field">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          :value="email"
          @input="$emit('update:email', $event.target.value)"
        />
      </div>

      <div class="login-form__field">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          :value="password"
          @input="$emit('update:password', $event.target.value)"
        />
      </div>

      <div class="login-form__buttons">
        <BaseButton
          type="submit"
          :text="isLoginPage ? 'sign in' : 'sign up'"
          @click="emit('submit')"
        />
        <router-link :to="isLoginPage ? '/register' : '/login'">
          {{ isLoginPage ? 'sign up' : 'Already registered?' }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
defineProps({
  name: String,
  email: String,
  password: String,
  error: String,
  isLoginPage: Boolean
})
const emit = defineEmits(['update:name', 'update:email', 'update:password', 'submit'])
</script>

<style lang="scss">
.login-form {
  background-color: #f0f8ff63;
  padding: 30px;
  border-radius: 30px;

  &__title {
    font-size: 50px;
    font-weight: 200;
    margin-bottom: 15px;
  }

  &__field {
    position: relative;
    margin-bottom: 25px;
    font-size: 28px;

    label {
      position: absolute;
      font-size: 16px;
      top: -15px;
      left: 7px;
    }

    input {
      border: 0;
      border: 1px solid gray;
      border-radius: 15px;
      background: transparent;
      width: 300px;
      padding: 5px 8px;
      font-size: 20px;
    }

    input:focus {
      outline: none;
    }

    input:focus ~ label,
    input:valid ~ label {
      top: -12px;
      font-size: 12px;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: none;
      font-weight: 600;
      color: inherit;
      padding: 16px 32px;

      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
