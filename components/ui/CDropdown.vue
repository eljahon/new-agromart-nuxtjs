<template>
  <div v-click-outside="closeMenu" class="relative flex flex-row text-left text-gray-800">
    <div>
      <span>
        <slot name="locale" />
      </span>
    </div>
    <div>
      <span class="">
        <slot name="trigger" :onClick="toggleMenu" />
      </span>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isMenuOpen"
        :class="dropdownClasses"
        class="absolute top-12 z-40 mt-2 overflow-hidden text-sm rounded-md custom-shadow min-w-56"
      >
        <div
          class="bg-white rounded-md ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <slot name="content" :closeMenu="closeMenu" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    dropdownClasses: String
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    closeMenu () {
      this.isMenuOpen = false
    },
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style></style>
