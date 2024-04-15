<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref, onErrorCaptured } from 'vue'

const authStore = useAuthStore()
const username = ref()
const password = ref()
const showErrorSnackBar = ref(false)
const errorMsg = ref('')

async function login() {
  await authStore.logIn(username.value, password.value)
}

onErrorCaptured((err) => {
  showErrorSnackBar.value = true
  errorMsg.value = err.message

  return false
})
</script>
<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-snackbar v-model="showErrorSnackBar" color="error" :timeout="2000" location="top right">
      {{ errorMsg }}
    </v-snackbar>
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field v-model="username" id="email-input" label="Email" type="email"></v-text-field>
        <v-text-field v-model="password" id="password-input" label="Password" type="password"></v-text-field>
        <v-btn type="submit" id="submitBtn" color="primary" block class="mt-2">Sign in</v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          Don't have an account? <router-link to="/register">Sign Up</router-link>
        </p>
      </div>
    </v-sheet>
  </div>
</template>
<style lang="scss" scoped></style>
