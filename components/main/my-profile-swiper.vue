<template>
  <swiper ref="swiper" class="swiper mt-4" :options="profileOption">
    <swiper-slide>
      <router-link :to="{path: localePath('/my-products')}" class="flex items-center justify-center shadow-md w-full font-medium border rounded-md bg-white py-2 text-gray-600">
        <i class="bx bx-clipboard text-lg" />
        <p class="ml-3">
          {{ $t('text.myAds') }}
        </p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link :to="{path: localePath('/chats')}" class="flex items-center justify-center shadow-md bg-white border rounded-md font-medium border-b py-2 text-gray-600">
        <i class="bx bx-message-rounded-dots text-lg" />
        <p class="ml-3">
          {{ $t('word.myConsultation') }}
        </p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link :to="{path: localePath('/my-profile/lands')}" :class="$tools.removeLangPath($route.path) === '/my-profile/lands'? 'bg-green-50 text-green-600 border-transparent' : ''" class="flex items-center justify-center shadow-md bg-white border rounded-md font-medium border-b py-2 text-gray-600">
        <i class="bx bx-map-alt text-lg" />
        <p class="ml-3">
          {{$t('word.myLands')}}
        </p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link :to="{path: localePath('/my-profile/settings')}" :class="$tools.removeLangPath($route.path) === '/my-profile/settings'? 'bg-green-50 border-green-200 text-green-600 border-transparent' : 'bg-white border-gray-200 text-gray-600'" class="flex border items-center justify-center shadow-md rounded-md font-medium py-2">
        <i class="bx bx-cog text-lg" />
        <p class="ml-3">
          {{ $t('word.settings') }}
        </p>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: 'FilterSwiper',
  data () {
    return {
      profileOption: {
        direction: 'horizontal',
        slideToClickedSlide: false,
        breakpoints: {
          640: {
            slidesPerView: 2.5,
            spaceBetween: 6
          },
          410: {
            slidesPerView: 1.3,
            spaceBetween: 10
          },
          350: {
            slidesPerView: 1.5,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 1.5,
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
  mounted () {
  },
  methods: {
    prev () {
      this.$refs.swiper.$swiper.slidePrev()
    },
    next () {
      this.$refs.swiper.$swiper.slideNext()
    }
  }
}
</script>
