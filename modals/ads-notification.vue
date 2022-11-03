<template>
  <div>
    <div id="view-header" class="h-7 bg-gray-800 hover:bg-gray-700 text-white hover:text-white">
      <div v-if="status == 'adding'" class="pl-4">
        Add ads notification
      </div>
      <div v-else-if="status == 'changing'" class="pl-4">
        Change ads notification
      </div>
      <div class="hidden sm:block absolute top-0 right-0 pr-4">
        <button type="button" class="rounded-md text-xl text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2" @click="onClose('canceled')">
          <span class="sr-only">Close</span>
          <font-awesome-icon class="h-6 w-6" icon="times" />
        </button>
      </div>
    </div>
    <div class="mx-4 my-2">
      {{ status }}
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {

  components: {},
  props: {
    user: Array,
    status: String
  },

  data () {
    return {}
  },

  watch: {},

  created () {},
  methods: {
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('ads-notification-modal', e)
    }
  }
}
</script>
<style scoped>
</style>
