<template>
  <div class="">
    <div class="relative w-full mb-1">
      <div>
        <input
          v-model="minprice"
          type="range"
          :step="step"
          :min="min"
          :max="max"
          class="
            absolute
            pointer-events-none
            appearance-none
            z-20
            h-1.5
            w-full
            opacity-0
            cursor-pointer
          "
          @input="mintrigger"
        >

        <input
          v-model="maxprice"
          type="range"
          :step="step"
          :min="min"
          :max="max"
          class="
            absolute
            pointer-events-none
            appearance-none
            z-20
            h-1.5
            w-full
            opacity-0
            cursor-pointer
          "
          @input="maxtrigger"
        >

        <div class="relative z-10 h-1.5">
          <div
            class="
              absolute
              z-10
              left-0
              right-0
              bottom-0
              top-0
              rounded-md
              bg-gray-200
            "
          />

          <div
            class="absolute z-20 top-0 bottom-0 rounded-md bg-indigo-500"
            :style="'right:' + maxthumb + '%; left:' + minthumb + '%'"
          />

          <div
            class="
              absolute
              z-30
              w-4
              h-4
              border-2 border-indigo-500
              top-0
              left-0
              bg-white
              rounded-full
            "
            style="margin-top: -0.3rem"
            :style="'left: ' + minthumb + '%'"
          />

          <div
            class="
              absolute
              z-30
              w-4
              h-4
              border-2 border-indigo-500
              top-0
              right-0
              bg-white
              rounded-full
            "
            style="margin-top: -0.3rem"
            :style="'right: ' + maxthumb + '%'"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <p class="text-gray-500">
        <span>{{ minprice | currency }}</span> -
        <span>{{ maxprice | currency }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1000
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  data (vm) {
    return {
      minprice: +(vm.$route.query.min || vm.min),
      maxprice: +(vm.$route.query.max || vm.max),
      minthumb: 0,
      maxthumb: 0
    }
  },
  created () {
    if (this.max && this.min) {
      this.minthumb = ((this.minprice - this.min) / (this.max - this.min)) * 100
      this.maxthumb =
        100 - ((this.maxprice - this.min) / (this.max - this.min)) * 100
    }
  },
  methods: {
    mintrigger () {
      this.validation()
      this.minprice = Math.min(this.minprice, this.maxprice - 500)
      this.minthumb = ((this.minprice - this.min) / (this.max - this.min)) * 100
      this.$emit('priceChanged', { min: this.minprice, max: this.maxprice })
    },
    maxtrigger () {
      this.validation()
      this.maxprice = Math.max(this.maxprice, this.minprice + 200)
      this.maxthumb =
        100 - ((this.maxprice - this.min) / (this.max - this.min)) * 100
      this.$emit('priceChanged', { min: this.minprice, max: this.maxprice })
    },
    validation () {
      if (/^\d*$/.test(this.minprice)) {
        if (this.minprice > this.max) {
          this.minprice = 9500
        }
        if (this.minprice < this.min) {
          this.minprice = this.min
        }
      } else {
        this.minprice = 0
      }
      if (/^\d*$/.test(this.maxprice)) {
        if (this.maxprice > this.max) {
          this.maxprice = this.max
        }
        if (this.maxprice < this.min) {
          this.maxprice = 200
        }
      } else {
        this.maxprice = 10000
      }
    }
  }
}
</script>

<style scoped lang="postcss">
input[type='range']::-webkit-slider-thumb {
  @apply w-6 h-6 appearance-none pointer-events-auto;
}
</style>
