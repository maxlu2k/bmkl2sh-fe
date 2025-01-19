<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['January ', 'February ', 'March ', 'April ', 'May ', 'June ', 'July ', 'August '],
        datasets: [{ data: [40, 20, 12, 30, 60, 72, 80, 40, 52, 33, 55, 56] }]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
