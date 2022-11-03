<template>
  <div>
    <slot name="trigger" :open="open" />
    <div
      v-show="isOpen"
      class="fixed inset-0 z-20 overflow-y-auto scroll"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <transition
          enter-active-class="duration-200 ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
          @after-enter="showContent = true"
        >
          <div
            v-show="isOpen"
            class="fixed inset-0 items-center justify-center p-4 overflow-y-auto transition-opacity bg-gray-700 bg-opacity-75 scroll"
            aria-hidden="true"
            @click.stop="hideContent"
          >
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >&#8203;</span>

            <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
            <transition
              enter-active-class="duration-300 ease-out"
              enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
              enter-to-class="translate-y-0 opacity-100 sm:scale-100"
              leave-active-class="duration-200 ease-in"
              leave-class="translate-y-0 opacity-100 sm:scale-100"
              leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
              @after-leave="close"
            >
              <div
                v-if="showContent"
                class="inline-block overflow-hidden text-left align-bottom transition-all transform rounded-lg sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                @click.stop=""
              >
                <slot name="default" :close="hideContent" />
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  data () {
    return {
      isOpen: false,
      showContent: false
    }
  },
  methods: {
    open () {
      this.isOpen = true
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

<style scoped>
.scroll::-webkit-scrollbar {
  @apply w-1;
}

.scroll::-webkit-scrollbar-track {
  @apply shadow;
}

.scroll::-webkit-scrollbar-thumb {
  @apply bg-gray-300;
  @apply rounded-full;
}
</style>
