import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import VueTheMask from 'vue-the-mask'
import 'vue-snotify/styles/material.css'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import 'vue-loaders/dist/vue-loaders.css'
import VueLoaders from 'vue-loaders'
import VueCurrencyFilter from 'vue-currency-filter'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import DatePicker from 'vue2-datepicker'
import 'viewerjs/dist/viewer.css'
import 'vue2-datepicker/index.css'
import Viewer from 'v-viewer'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.use(VueTheMask)
const options = {
  toast: {
    position: SnotifyPosition.rightBottom,
    showProgressBar: false,
    timeout: 2000,
    titleMaxLength: 100
  }
}
const moneyConfig = {
  decimal: '.',
  thousands: ',',
  precision: 0,
  masked: false,
  thousandsSeparator: ',',
  fractionCount: 0,
  fractionSeparator: '.'
}
const vueImgConfig = {
  // Use `alt` attribute as gallery slide title
  altAsTitle: false,
  // Display 'download' button near 'close' that opens source image in new tab
  sourceButton: false,
  // Event listener to open gallery will be applied to <img> element
  openOn: 'click',
  // Show thumbnails for all groups with more than 1 image
  thumbnails: false
}
Vue.use(Snotify, options)
Vue.use(vueAwesomeCountdown, 'vac')
Vue.use(VueLoaders)
Vue.use(VueCurrencyFilter, moneyConfig)
Vue.use(PerfectScrollbar)
Vue.use(Viewer)

Vue.component('DatePicker', DatePicker)
Vue.component('v-select', vSelect)
