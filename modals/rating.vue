<template>
  <div class="p-5">
    <div
      class="float-right text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer"
      @click="onClose('canceled')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        style="fill: rgba(75, 85, 99, 1); transform: ; -ms-filter: "
      >
        <path
          d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"
        />
      </svg>
    </div>
    <div class="text-xl mt-5 text-center text-gray-700">
      {{ $t('text.evaluateAdvice') }}
    </div>
    <div class="flex justify-center my-5">
      <star-rating v-model="rating" />
    </div>
    <div>
      <label for="comment" class="block text-sm font-medium text-gray-700">{{ $t('text.addYourFeedback') }}</label>
      <div class="mt-1">
        <textarea id="comment" v-model="comment" rows="3" name="comment" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
      </div>
    </div>
    <div class="grid justify-items-center text-center mt-5">
      <button
        class="bg-green-600 text-white py-1 text-lg px-6 rounded-md"
        @click="
          submit()
          onClose('canceled')
        "
      >
        Baholash
      </button>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/no-mutating-props */
export default {
  name: 'App',
  components: {},
  props: {
    currentRoom: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      rating: 0,
      comment: ''
    }
  },
  methods: {
    async submit () {
      this.currentRoom.rate0to5 = this.rating
      this.currentRoom.feedback = this.comment
      await this.$store
        .dispatch('crud/chats/room/updateRooms', {
          id: this.currentRoom.id,
          data: { ...this.currentRoom }
        })
        .then((res) => {
          this.onClose()
        })
        .catch((error) => {
          this.$snotify.error(error.response.data.detail)
        })
    },
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('rating-modal', e)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
