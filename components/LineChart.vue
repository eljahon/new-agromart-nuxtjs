<script>
import { Line } from 'vue-chartjs'
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
// ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    containerClass: {
      type: String,
      default: 'chart-container'
    },
    onChange: {
      type: String,
      required: true
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {
    onChange () {
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
