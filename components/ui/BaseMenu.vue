<template>
  <div class="lg:relative">
    <div ref="trigger">
      <slot
        name="trigger"
        :isOpen="isOpen"
        :onToggle="toggle"
        :close="close"
      />
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="ransform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="ransform opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        v-click-outside="close"
        class="
          origin-top-right
          absolute
          z-10
          inset-x-0
          mt-2
          rounded-md
          shadow-lg
          bg-white
          ring-1 ring-black ring-opacity-5
          focus:outline-none
        "
        :class="`${
          align === 'left' ? 'left-0' : 'lg:left-auto lg:right-0'
        } ${menuSize}`"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div class="px-3">
          <slot name="default" :close="close" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseMenu',
  props: {
    align: {
      type: String,
      default: 'right'
    },
    size: {
      type: String,
      default: 'sm' // md, lg, xl
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    menuSize () {
      let size
      switch (this.size) {
        case 'sm':
          size = 'lg:w-56'
          break
        case 'md':
          size = 'lg:w-80'
          break
        case 'lg':
          size = 'lg:w-100'
          break
        case 'max':
          size = 'lg:w-max'
          break

        default:
          size = 'lg:w-56'
          break
      }
      return size
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    },
    close (event) {
      if (event) {
        if (
          !(
            event.target === this.$refs.trigger ||
            this.$refs.trigger.contains(event.target)
          )
        ) {
          this.isOpen = false
        }
      } else {
        this.isOpen = false
      }
    }
  }
}
</script>

<style></style>
