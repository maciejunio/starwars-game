<script setup lang="ts">
import type { DocumentData } from 'firebase/firestore'
import { computed, type PropType } from 'vue'
import { DeckType } from '@/stores/game'

const props = defineProps({
  showCards: { default: false, type: Boolean },
  isWinner: { default: false, type: Boolean },
  cardData: { default: () => {}, type: Object as PropType<DocumentData> }
})

const mappedCardData = computed(() => {
  if (props.cardData.type === DeckType.People) {
    return {
      name: props.cardData.name,
      mass: props.cardData.mass,
      height: props.cardData.height
    }
  }
  return {
    name: props.cardData.name,
    passengers: props.cardData.passengers,
    crew: props.cardData.crew
  }
})
</script>
<template>
  <div class="card">
    <div class="card-inner" :class="{ rotate: props.showCards, 'is-winner': props.isWinner }">
      <div class="card__back">
        <span class="border"></span><span class="card__back_design"></span>
      </div>
      <div class="card__front" v-if="cardData">
        <v-list lines="one">
          <v-list-item
            v-for="(value, name, index) in mappedCardData"
            :key="index"
            :title="name"
            :subtitle="value"
          ></v-list-item>
        </v-list>
        <h1 v-if="isWinner" class="text-center">WINNER !</h1>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.border {
  border-radius: 15px;
  border: 4px solid hsla(4, 100%, 22%, 1);
  width: 90%;
  height: 93%;
  position: absolute;
}

.card {
  width: 247px;
  height: 400px;
  border-radius: 15px;
}

.card-inner {
  border-radius: 15px;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0px 0px 49px 1px rgba(0, 0, 0, 0.75);
}

.is-winner {
  box-shadow: 0px 0px 49px 1px rgba(54, 224, 7, 0.75);
}

.rotate {
  transform: rotateY(180deg);
}

.card__front,
.card__back {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  display: grid;
  place-items: center;
  border-radius: 15px;
}

.card__back_design {
  width: 81%;
  height: 87%;
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='50' height='100' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M12.5 0L0 25l12.5 25L25 25 12.5 0zm25 50L25 75l12.5 25L50 75 37.5 50z'  stroke-width='1' stroke='none' fill='hsla(4, 90%, 58%, 1)'/><path d='M37.5 0L50 25 37.5 50 25 25zm-25 50L25 75l-12.5 25L0 75z'  stroke-width='1' stroke='none' fill='hsla(4, 100%, 22%, 1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
}

.card__front {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  height: 100%;
  width: 100%;
  background-color: white;
  transform: rotateY(180deg);
}
</style>
