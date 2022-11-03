<template>
  <div class="flex-shrink-0 relative ml-5">
    <div ref="trigger">
      <slot name="trigger" :onToggle="toggle" />
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpened"
        v-click-outside="close"
        class="
          origin-top-right
          absolute
          z-10
          right-0
          mt-2
          w-48
          rounded-md
          shadow-lg
          bg-white
          ring-1 ring-black ring-opacity-5
          py-1
          focus:outline-none
        "
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <nuxt-link
          v-for="(item, index) in items"
          :key="index"
          tag="a"
          :to="{ path: item.link }"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {{ item.text }}
        </nuxt-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      validator: (prop) => {
        return prop.every(item => 'text' in item && 'link' in item)
      }
    }
  },
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    toggle () {
      this.isOpened = !this.isOpened
    },
    close (event) {
      if (
        !(
          event.target === this.$refs.trigger ||
          this.$refs.trigger.contains(event.target)
        )
      ) {
        this.isOpened = false
      }
    }
  }
}
</script>

<style></style>
