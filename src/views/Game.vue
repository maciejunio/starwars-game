<script setup lang="ts">
import { ref } from 'vue'
import {
  collection,
  limit,
  orderBy,
  query,
  where,
  documentId,
  doc,
  getDocs,
} from 'firebase/firestore'
import { fireDb } from '@/firebase/firebase'
import { DeckType, useGameStore } from '@/stores/game'
import { useAuthStore } from '@/stores/auth'
import Card from '@/components/Card.vue'
import ScoreChart from '@/components/ScoreChart.vue'

const { logOut } = useAuthStore();
const { incrementScore } = useGameStore()

const { peoplePlayer, starshipPlayer } = useGameStore()
const showCards = ref<boolean>(false)
const peopleCardWin = ref<boolean>(false)
const peopleCard = ref()
const starshipCardWin = ref<boolean>(false)
const starshipCard = ref()
const isPlayBtnDisabled = ref<boolean>(false)

async function getCard(autoId: string, cardType: DeckType) {
  const querySnapshot = await getDocs(
    query(
      collection(fireDb, 'cards'),
      where('type', '==', cardType),
      where('__name__', '>=', autoId),
      orderBy(documentId()),
      limit(1)
    )
  );

  if (querySnapshot.size > 0) {
    return querySnapshot.docs[0].data();
  }

  const alternativeQuerySnapshot = await getDocs(
    query(
      collection(fireDb, 'cards'),
      where('type', '==', cardType),
      where('__name__', '<', autoId),
      orderBy(documentId()),
      limit(1)
    )
  );

  if (alternativeQuerySnapshot.size > 0) {
    return alternativeQuerySnapshot.docs[0].data();
  }

  return null;
}

async function play() {
  isPlayBtnDisabled.value = true
  const autoId = doc(collection(fireDb, 'cards')).id

  peopleCard.value = await getCard(autoId, DeckType.People)
  starshipCard.value = await getCard(autoId, DeckType.Starships)

  if (peopleCard.value.mass > starshipCard.value.crew) {
    peopleCardWin.value = true
    incrementScore(peoplePlayer)
  } else if (peopleCard.value.mass < starshipCard.value.crew) {
    starshipCardWin.value = true
    incrementScore(starshipPlayer)
  }

  showCards.value = true

  setTimeout(() => {
    peopleCardWin.value = false
    starshipCardWin.value = false
    showCards.value = false
    isPlayBtnDisabled.value = false
  }, 3000)
}
</script>
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="d-flex flex-column align-center" cols="12" sm="4">
        <h1 class="pb-5">People - {{ peoplePlayer.name }} {{ peoplePlayer.score }}</h1>
        <Card :show-cards="showCards" :cardData="peopleCard" :is-winner="peopleCardWin" />
      </v-col>
      <v-col cols="12" sm="4">
        <ScoreChart />
        <v-btn :disabled="isPlayBtnDisabled" color="primary" block @click="play">Play</v-btn>
        <v-btn color="primary" class="mt-2" block @click="$router.push({ name: 'GamePreparation'})">New game</v-btn>
        <v-btn color="primary" class="mt-2" block @click="logOut">Logout</v-btn>
      </v-col>
      <v-col class="d-flex flex-column align-center" cols="12" sm="4">
        <h1 class="pb-5">Starships - {{ starshipPlayer.name }} {{ starshipPlayer.score }}</h1>
        <Card :show-cards="showCards" :cardData="starshipCard" :is-winner="starshipCardWin" />
      </v-col>
    </v-row>
  </v-container>
</template>
