<template>
  <div v-swiper="sliderOptions" :loadtheme="false" class="swiper">
    <div class="swiper-wrapper">
      <slot name="pre-slide" />
      <div
        v-for="(item, index) in items"
        :key="`slide-${index}`"
        class="swiper-slide"
      >
        <slot :item="item" />
      </div>
      <slot name="post-slide" />
    </div>
    <div
      v-if="showNavigation"
      slot="button-prev"
      class="swiper-button-prev"
    />
    <div
      v-if="showNavigation"
      slot="button-next"
      class="swiper-button-next"
    />
  </div>
</template>

<script>
import defaultOptions from '~/components/ui/swiper-options'

export default {
  name: 'BaseSwiper',
  props: {
    items: {
      type: Array,
      required: true
    },
    slidesPerView: {
      type: Number,
      default: 4
    },
    options: {
      type: Object,
      default: () => {}
    },
    breakpoints: {
      type: Object,
      default: () => {}
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    autoplay: {
      type: [Boolean, Object],
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    showNavigation: {
      type: Boolean,
      default: true
    },
    allowTouchMove: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  computed: {
    sliderOptions () {
      return {
        ...defaultOptions,
        slidesPerView: this.slidesPerView,
        direction: this.direction,
        loop: this.loop,
        autoplay: this.autoplay,
        allowTouchMove: this.allowTouchMove,
        breakpoints: this.breakpoints
          ? {
              ...defaultOptions.breakpoints,
              ...this.breakpoints
            }
          : null
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.swiper-button-prev {
  @apply h-8;
  @apply text-gray-400;
}
.swiper-button-prev::after {
  @apply text-2xl;
  @apply font-semibold;
}
.swiper-button-next {
  @apply h-8;
  @apply text-gray-400;
}
.swiper-button-next::after {
  @apply text-2xl;
  @apply font-semibold;
}

.swiper-container-vertical > .swiper-button-prev {
  @apply left-8;
  @apply top-6;
  @apply bottom-auto;
  @apply transform;
  @apply rotate-90;
}

.swiper-container-vertical > .swiper-button-next {
  @apply left-8;
  @apply bottom-0;
  @apply top-auto;
  @apply transform;
  @apply rotate-90;
}
</style>
