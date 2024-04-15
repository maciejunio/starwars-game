<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const username = ref()
const password = ref()

async function login() {
  await authStore.register(username.value, password.value)
}
</script>
<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field v-model="username" label="Email"></v-text-field>

        <v-text-field v-model="password" label="Password"></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
<style lang="scss" scoped></style>
