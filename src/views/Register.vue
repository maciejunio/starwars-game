<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref, onErrorCaptured } from 'vue'

const authStore = useAuthStore()
const email = ref()
const password = ref()
const showErrorSnackBar = ref(false)
const errorMsg = ref('')

async function login() {
  errorMsg.value = ''
  await authStore.register(email.value, password.value)
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
        <v-text-field v-model="email" id="email-input" label="Email" type="email"></v-text-field>
        <v-text-field v-model="password" id="password-input" label="Password" type="password"></v-text-field>
        <v-btn :disabled="!email || !password" type="submit" id="submitBtn" color="primary" block class="mt-2">Sign in</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
<style lang="scss" scoped></style>
