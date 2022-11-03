<template>
  <div>
    <slot name="trigger" :onClick="toggle" />
    <section
      v-show="isOpen"
      class="fixed z-20 inset-0 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 overflow-hidden">
        <!--
      Background overlay, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <transition
          enter-active-class="ease-in-out duration-200"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in-out duration-300"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
          @after-enter="showContent = true"
        >
          <div
            v-show="isOpen"
            class="
              absolute
              inset-0
              bg-gray-500 bg-opacity-75
              transition-opacity
            "
            aria-hidden="true"
            @click="hideContent"
          />
        </transition>

        <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
      -->
          <transition
            enter-active-class="transform transition ease-in-out duration-200 sm:duration-400"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-300 sm:duration-400"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
            @after-leave="close"
          >
            <div v-show="showContent" class="w-screen max-w-xl">
              <div
                class="
                  h-full
                  flex flex-col
                  py-6
                  bg-white
                  shadow-xl
                  overflow-y-scroll
                "
              >
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <slot name="title" />
                    <div class="ml-3 h-7 flex items-center">
                      <button
                        class="
                          bg-white
                          rounded-md
                          text-gray-400
                          hover:text-gray-500
                          focus:outline-none
                          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                        "
                        @click.stop="hideContent"
                      >
                        <span class="sr-only">Close panel</span>
                        <!-- Heroicon name: outline/x -->
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  <slot />
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false,
      showContent: false
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    },
    hideContent () {
      this.showContent = false
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>

<style></style>
