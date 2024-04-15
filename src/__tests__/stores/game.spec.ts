import { setActivePinia, createPinia, storeToRefs } from 'pinia'
import { expect, test, beforeEach } from 'vitest'
import { DeckType, useGameStore } from '@/stores/game'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Should return correct player', async () => {
  const store = useGameStore();
  const storeRefs = storeToRefs(store)
  const firstPlayerMock = {
    name: 'Test1',
    deck: DeckType.Starships,
    score: 0
  }
  const secondPlayerMock = {
    name: 'Test2',
    deck: DeckType.People,
    score: 0
  }

  
  storeRefs.firstPlayer.value = firstPlayerMock
  storeRefs.secondPlayer.value = secondPlayerMock
  
  expect(store.peoplePlayer.value).toStrictEqual(secondPlayerMock)
  expect(store.starshipPlayer.value).toStrictEqual(firstPlayerMock)
})

test('Should increment score correctly', async () => {
  const store = useGameStore();
  const storeRef = storeToRefs(store)
  const firstPlayerMock = {
    name: 'Test1',
    deck: DeckType.People,
    score: 0
  }
  const secondPlayerMock = {
    name: 'Test2',
    deck: DeckType.Starships,
    score: 0
  }

  storeRef.firstPlayer.value = firstPlayerMock
  storeRef.secondPlayer.value = secondPlayerMock

  store.incrementScore(storeRef.firstPlayer);
  store.incrementScore(storeRef.secondPlayer);


  expect(store.firstPlayer.score).toBe(1)
  expect(store.secondPlayer.score).toBe(1)
})
