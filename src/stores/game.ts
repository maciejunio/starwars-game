import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const enum DeckType {
  People = 'People',
  Starships = 'Starships'
}

export type Player = {
  name: string
  deck: DeckType | null
  score: number
}

export const useGameStore = defineStore('game', () => {
  const numberOfPlayers = ref<number>(1)
  const firstPlayer = ref<Player>({
    name: '',
    deck: null,
    score: 0
  })
  const secondPlayer = ref<Player>({
    name: '',
    deck: null,
    score: 0
  })

  const peoplePlayer = computed(() => {
    if (firstPlayer.value.deck === DeckType.People) {
      return firstPlayer
    }

    return secondPlayer
  })

  const starshipPlayer = computed(() => {
    if (firstPlayer.value.deck === DeckType.Starships) {
      return firstPlayer
    }

    return secondPlayer
  })

  function incrementScore(player: Ref<Player>) {
    console.log(player)
    player.value.score += 1
  }

  return {
    numberOfPlayers,
    firstPlayer,
    secondPlayer,
    peoplePlayer,
    starshipPlayer,
    incrementScore
  }
})
