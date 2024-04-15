<script setup lang="ts">
import { computed, ref } from 'vue'
import { BarChart, useBarChart } from 'vue-chart-3'
import { Chart, type ChartData, registerables, type ChartOptions } from 'chart.js'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
const { firstPlayer, secondPlayer } = storeToRefs(useGameStore())

Chart.register(...registerables)

const dataValues = computed(() => [firstPlayer.value.score, secondPlayer.value.score])
const dataLabels = ref([firstPlayer.value.name, secondPlayer.value.name])

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
