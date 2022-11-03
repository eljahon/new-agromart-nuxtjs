<template>
  <div class="p-1 pb-4">
    <div
      class="flex justify-between items-start py-2 px-1 rounded-t border-b dark:border-gray-600"
    >
      <button
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="defaultModal"
        @click="onClose('canceled')"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <h3
        class="text-xl ml-2 font-semibold text-gray-900 lg:text-2xl dark:text-white"
      >
        {{ $t("text.sendPhoto") }}
      </h3>
      <button
        type="button"
        class="text-green-700 bg-green-100 hover:bg-green-200 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="defaultModal"
        @click="send()"
      >
        {{ $t("word.send") }}
      </button>
    </div>
    <div style="position: relative">
      <div class="image_placeholder mb-2">
        <img v-if="image" :src="$tools.getFileUrl(image)" alt="image" />
        <div v-else style="font-size: 144px; font-weight: 100">
          <i class="bx bx-image" />
        </div>
      </div>
    </div>
    <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
        <textarea
          :rows="1"
          v-model="text"
          :placeholder="$t('text.writeYourMessage')"
          class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3"
          @keyup.enter="send()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import imageEditor from "~/modals/image-editor.vue";
export default {
  name: "MediaContent",
  props: {
    image: String
  },
  data() {
    return {
      isOpen: false,
      text: "",
    };
  },
  methods: {
    send() {
      if (this.image) {
        this.onClose({
          image: this.image,
          text: this.text,
        });
      }
    },
    onClose(data) {
      this.$emit("close");
      this.$root.$emit("send-media-modal", data);
    },
  },
};
</script>

<style scoped>
.image_placeholder {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
