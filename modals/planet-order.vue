<template>
  <div class="p-4">
    <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
      <button
        type="button"
        class="
          bg-white
          rounded-md
          text-gray-400
          hover:text-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
        @click="onClose('canceled')"
      >
        <span class="sr-only">{{ $t("word.close") }}</span>
        <font-awesome-icon class="h-6 w-6" icon="times" />
      </button>
    </div>
    <div class="sm:flex sm:items-start">
      <div
        class="
          mx-auto
          flex-shrink-0 flex
          items-center
          justify-center
          h-12
          w-12
          rounded-full
          bg-yellow-100
          sm:mx-0 sm:h-10 sm:w-10
        "
      >
        <font-awesome-icon
          class="h-6 w-6 text-yellow-600"
          icon="exclamation-triangle"
        />
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3
          id="modal-title"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          {{ $t("text.wouldYouLikeToOrder") }}
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            {{ $tools.getDate(data.published) }}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-1">
      <button
        type="button"
        class="
          mt-3
          text-xs text-yellow-500
          bg-red-100
          font-medium
          flex
          items-center
          rounded-md
          p-2
        "
        @click="toOK('canceled')"
      >
        OK
      </button>
      <button
        type="button"
        class="
          mt-3
          text-xs text-gray-500
          bg-gray-200
          font-medium
          flex
          items-center
          rounded-md
          p-2
        "
        @click="onClose('canceled')"
      >
        {{ $t("word.cancel") }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {},
    },
  },

  data() {
    return {};
  },

  watch: {},

  created() {
    console.log(this.name);
  },
  methods: {
    toOK() {
      this.onClose("success");
    },
    onClose(e) {
      this.$emit("close");
      this.$root.$emit("planet-order-modal", e);
    },
  },
};
</script>
<style scoped>
</style>
