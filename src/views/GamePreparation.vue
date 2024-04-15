<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore, DeckType } from '@/stores/game'
import { useAuthStore } from '@/stores/auth'

const { logOut } = useAuthStore()
const { numberOfPlayers, firstPlayer, secondPlayer } = storeToRefs(useGameStore())

const deckOptions = [DeckType.People, DeckType.Starships]
const numberOfPlayersOptions = [1, 2]
const firstPlayerDeckOptions = computed(() => {
  return deckOptions.filter((option) => option !== secondPlayer.value.deck)
})
const secondPlayerDeckOptions = computed(() => {
  return deckOptions.filter((option) => option !== firstPlayer.value.deck)
})

function clearSelections(): void {
  firstPlayer.value.name = ''
  firstPlayer.value.deck = null
  secondPlayer.value.name = ''
  secondPlayer.value.deck = null
}
</script>
<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-select
        v-model="numberOfPlayers"
        id="numberOfPlayers"
        label="Number of players"
        :items="numberOfPlayersOptions"
        @update:modelValue="clearSelections"
      ></v-select>
      <v-text-field label="First player name" v-model="firstPlayer.name"></v-text-field>
      <v-select
        v-model="firstPlayer.deck"
        label="First player deck"
        :items="firstPlayerDeckOptions"
        clearable
        clear-icon="mdi-close-circle"
      ></v-select>
      <template v-if="numberOfPlayers > 1">
        <v-text-field label="Second player name" v-model="secondPlayer.name"></v-text-field>
        <v-select
          label="Second player deck"
          v-model="secondPlayer.deck"
          :items="secondPlayerDeckOptions"
          clearable
          clear-icon="mdi-close-circle"
        ></v-select>
      </template>

      <v-btn color="primary" block class="mt-2" @click="$router.push({ name: 'Game' })">Play</v-btn>
      <v-btn color="primary" block class="mt-2" @click="logOut">Logout</v-btn>
    </v-sheet>
  </div>
</template>
