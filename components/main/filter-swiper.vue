<template>
  <swiper ref="swiper" class="swiper" :options="filterOption">
    <swiper-slide
      class="bg-white border-transparent filter flex items-center justify-center rounded-md  focus:outline-none"
    >
      <div class="text-lg text-gray-700 " @click="openFilter()">
        <i class="flex justify-center items-center bx bx-slider-alt " />
      </div>
    </swiper-slide>
    <swiper-slide class="sort">
      <button class="flex items-center justify-start sort px-4 border focus:border-green-600 border-transparent shadow-sm focus:bg-green-50 bg-white py-1 rounded-md focus:text-green-600 text-gray-400">
        <div class="text-2xl focus:text-green-600 text-gray-400 pr-6">
          <i class="flex justify-center items-center bx bx-up-arrow-alt " />
        </div>
        {{ $t('word.sell') }}
      </button>
    </swiper-slide>
    <swiper-slide class="sort">
      <button class="flex items-center justify-start sort px-4 focus:border-green-600 border border-transparent shadow-sm focus:bg-green-50 bg-white py-1 rounded-md focus:text-green-600  text-gray-400">
        <div class="text-2xl text-gray-400 pr-6">
          <i class="flex justify-center items-center bx bx-down-arrow-alt " />
        </div>
        {{ $t('word.buy') }}
      </button>
    </swiper-slide>
  </swiper>
</template>

<script>
import filterModal from '../../modals/filter.vue'
export default {
  name: 'FilterSwiper',
  data () {
    return {
      filterOption: {
        direction: 'horizontal',
        slideToClickedSlide: false,
        breakpoints: {
          640: {
            slidesPerView: 'auto',
            spaceBetween: 6
          },
          410: {
            slidesPerView: 'auto',
            spaceBetween: 10
          },
          350: {
            slidesPerView: 'auto',
            spaceBetween: 10
          },
          320: {
            slidesPerView: 'auto',
            spaceBetween: 10
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    openFilter () {
      this.$emit('close')
      this.$modal.show(
        filterModal,
        { status: 'filter' },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          acrollable: true
        }
      )
    }
  }
}
</script>

<style scoped>
.filter {
  width: 40px !important;
  height: 40px !important
}
.sort {
  width: 192px !important;
}
</style>
