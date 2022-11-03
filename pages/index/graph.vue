<template>
  <div class="max-w-7xl mx-auto py-6 px-4 lg:px-8">
    <div class="pb-6 flex justify-between">
      <breadcrumbs :items="items" />
      <router-link
        :to="{ path: localePath('/prices') }"
        class="bg-green-600 rounded-md text-white font-medium px-4 py-2"
      >
        {{ $t('text.allProducts') }}
      </router-link>
    </div>
    <div class="grid md:grid-cols-4 grid-cols-1 md:gap-3 gap-0 md:space-y-0 space-y-3">
      <div class="col-span-1">
        <div class="border-transparent rounded-md bg-white p-3">
          <div class="text-gray-600 text-lg font-medium">
            {{ $t('text.basicInformation') }}
          </div>
          <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
            <form class="" @submit.prevent="passes(onSubmit)">
              <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Region">
                <select
                  v-model="query.region_id"
                  :state="errors[0] ? false : valid ? true : null"
                  class="
                    form-select
                    text-sm
                    w-full
                    border
                    text-gray-900
                    py-2
                    mt-3
                    border-gray-300
                    rounded-md
                    focus:outline-none
                    focus:border-gray-300
                    transition-colors
                    cursor-pointer
                  "
                >
                  <option v-for="(region, index) in regions" :key="index" :value="region.id">
                    {{ region.name[$i18n.locale] }}
                  </option>
                </select>
              </ValidationProvider>
              <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Category">
                <select
                  v-model="query.category_id"
                  :state="errors[0] ? false : valid ? true : null"
                  class="
                    form-select
                    text-sm
                    w-full
                    border
                    text-gray-900
                    py-2
                    mt-2
                    border-gray-300
                    rounded-md
                    focus:outline-none
                    focus:border-gray-300
                    transition-colors
                    cursor-pointer
                  "
                >
                  <option v-for="(category, index) in categories" :key="index" :value="category.id">
                    {{ category.title[$i18n.locale] }}
                  </option>
                </select>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ valid, errors }"
                rules="required"
                name="Product"
              >
                <select
                  v-model="query.product_id"
                  :state="errors[0] ? false : valid ? true : null"
                  class="
                  form-select
                  text-sm
                  w-full
                  border
                  text-gray-900
                  py-2
                  mt-2
                  border-gray-300
                  rounded-md
                  focus:outline-none
                  focus:border-gray-300
                  transition-colors
                  cursor-pointer
                "
                >
                  <option v-for="(product, index) in products" :key="index" :value="product.id">
                    {{ product.product.name[$i18n.locale] }}
                  </option>
                </select>
              </ValidationProvider>
              <div class="text-gray-600 font-medium mb-2 mt-3">
                {{ $t('text.timeInterval') }}
              </div>
              <ValidationProvider
                v-slot="{ valid, errors }"
                rules="required"
                name="Date Gte"
              >
                <date-picker
                  v-model="query.date_gte"
                  :state="errors[0] ? false : valid ? true : null"
                  :disabled-date="setGteDisable"
                  format="DD-MM-YYYY"
                  input-class="flex items-center rounded-md border-gray-300 w-full"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ valid, errors }"
                rules="required"
                name="Date Lte"
              >
                <date-picker
                  v-model="query.date_lte"
                  :state="errors[0] ? false : valid ? true : null"
                  :disabled-date="setLteDisable"
                  format="DD-MM-YYYY"
                  input-class="flex items-center rounded-md border-gray-300 w-full mt-2"
                />
              </ValidationProvider>
              <button
                type="submit"
                :disabled="invalid"
                :class="invalid ? 'bg-gray-100 text-gray-500 w-full rounded-md py-2 mt-2' : 'bg-light-orange w-full rounded-md text-white py-2 mt-2'"
              >
                {{ $t('text.seeResult') }}
              </button>
            </form>
          </ValidationObserver>
        </div>
        <div class="border-transparent rounded-md bg-white p-3 mt-4">
          <div class="text-gray-600 text-lg font-medium">
            {{ $t('word.comparison') }}
          </div>

          <div class="grid grid-cols-2 gap-3 my-3">
            <button class="text-gray-700 text-sm border rounded-md text-center py-2">
              {{ $t('word.regions') }}
            </button>
            <button class="text-gray-700 text-sm border rounded-md text-center py-2">
              {{ $t('word.products') }}
            </button>
          </div>

          <div class="text-gray-700 text-sm mb-2">
            {{ $t('text.priceParam') }}
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button class="text-gray-700 text-xs border rounded-md text-center py-2">
              {{ $t('word.max') }}
            </button>
            <button class="text-gray-700 text-xs border rounded-md text-center py-2">
              {{ $t('word.average') }}
            </button>
            <button class="text-gray-700 text-xs border rounded-md text-center py-2">
              {{ $t('word.min') }}
            </button>
          </div>
          <select
            class="
              form-select
              text-sm
              w-full
              border
              text-gray-500
              py-2
              my-3
              border-gray-300
              rounded-md
              focus:outline-none
              focus:border-gray-300
              transition-colors
              cursor-pointer
            "
          >
            <option value="">
              Viloyatlarni tanlang
            </option>
            <option value="">
              Sotib olish
            </option>
          </select>
          <button class="bg-gray-100 text-gray-500 font-medium w-full rounded-md text-sm py-2 mt-2">
            {{ $t('word.comparison') }}
          </button>
        </div>
      </div>
      <div class="col-span-3">
        <line-chart :chart-data="chartData" :options="chartOptions" :on-change="`change${lineChartChangeCount}`" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
export default {
  name: 'Graph',
  auth: false,
  components: { Breadcrumbs },
  data () {
    return {
      time: '',
      time1: '',
      items: [{ text: 'Narx-navolar', link: '/prices', disabled: false }],
      lineChartChangeCount: 1,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Average',
            borderColor: '#4bcc96',
            borderWidth: 4,
            pointBackgroundColor: '#4bcc96',
            pointRadius: 4,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#000',
            fill: false,
            data: []
          },
          {
            label: 'Maximum',
            borderColor: '#FF3333',
            borderWidth: 4,
            pointBackgroundColor: '#FF3333',
            pointRadius: 4,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#000',
            fill: false,
            data: []
          },
          {
            label: 'Minimum',
            borderColor: '#66B2FF',
            borderWidth: 4,
            pointBackgroundColor: '#66B2FF',
            pointRadius: 4,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#000',
            fill: false,
            data: []
          }
        ]
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          backgroundColor: '#00055e',
          titleFontColor: '#ffffff',
          bodyFontColor: '#ffffff',
          position: 'nearest',
          intersect: 0,
          bodySpacing: 4,
          xPadding: 20
        }
      },
      query: {
        region_id: 14,
        category_id: 2,
        product_id: null,
        date_gte: null,
        date_lte: new Date()
      },
      regions: [],
      categories: [],
      products: []
    }
  },
  computed: {
    chart () {
      return {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            pointBackgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            pointBorderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            pointHoverBackgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            pointHoverBorderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            fill: false
          }
        ]
      }
    }
  },
  watch: {
    'query.category_id' () {
      if (this.query.category_id && this.query.region_id) {
        this.fetchProducts()
      }
    }
  },
  mounted () {
    // this.$router.push({
    //   path: this.$route.path,
    //   query: this.query
    // })
    this.query.date_gte = new Date(this.query.date_lte.getTime() - 30 * 24 * 60 * 60000)
    this.fetchDirectories()
  },
  methods: {
    setGteDisable (date) {
      return (
        date > new Date(this.query.date_gte)
      )
    },
    setLteDisable (date) {
      return (
        date < new Date(this.query.date_gte.getTime())
      )
    },
    async onSubmit () {
      await this.$store
        .dispatch('crud/static/get', {
          url: '/price_statistics',
          query: {
            '_where[0][product.id]': this.query.region_id,
            '_where[0][date_gte]': this.query.date_gte,
            '_where[0][date_lte]': this.query.date_lte
          }
        })
        .then((res) => {
          if (res.length > 0) {
            this.lineChartChangeCount++
            this.chartData.labels = []
            this.chartData.datasets[0].data = []
            this.chartData.datasets[1].data = []
            this.chartData.datasets[2].data = []
            res.forEach((product) => {
              this.chartData.labels.push(product.label)
              this.chartData.datasets[0].data.push(product.data.avg)
              this.chartData.datasets[1].data.push(product.data.max)
              this.chartData.datasets[2].data.push(product.data.min)
            })
          }
        })
    },
    async fetchProducts () {
      await this.$store
        .dispatch('crud/price/getPrice', {
          '_where[0][islast]': true,
          '_where[0][avg_gt]': 0,
          '_where[0][region.id]': this.query.region_id,
          '_where[0][product.productcategory]': this.query.category_id
        })
        .then((res) => {
          this.products = res
          this.query.product_id = res[0].id
        })
    },
    async fetchDirectories () {
      await this.$store.dispatch('crud/region/getRegion').then((res) => {
        this.regions = res
      })
      await this.$store.dispatch('crud/price/category/getProductCategory').then((res) => {
        this.categories = res
      })
      if (this.query.region_id && this.query.category_id) {
        this.fetchProducts()
      }
      await this.onSubmit()
    }
  }
}
</script>
