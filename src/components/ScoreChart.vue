<script setup lang="ts">
import { computed, ref } from 'vue'
import { BarChart, useBarChart } from 'vue-chart-3'
import { Chart, type ChartData, registerables, type ChartOptions } from 'chart.js'
import { useGameStore } from '@/stores/game'
const { peoplePlayer, starshipPlayer } = useGameStore()

Chart.register(...registerables)

const dataValues = computed(() => [peoplePlayer.value.score, starshipPlayer.value.score])
const dataLabels = ref([peoplePlayer.value.name, starshipPlayer.value.name])

const testData = computed<ChartData<'bar'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ['#F44033', '#700700']
    }
  ]
}))

const options = computed<ChartOptions<'bar'>>(() => ({
  scales: {
    y: {
      ticks: {
        stepSize: 1
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Players score'
    }
  }
}))

const { barChartProps } = useBarChart({
  chartData: testData,
  options
})
</script>
<template>
  <BarChart v-bind="barChartProps" />
</template>
