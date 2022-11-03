<template>
  <div class="relative">
    <div class="absolute right-5 bottom-5 text-center py-1 px-3 rounded-md hover:bg-gray-100  cursor-pointer" @click="onClose('canceled')">
      <p class="text-white hover:text-gray-800">
        Yopish
      </p>
    </div>
    <div class="rounded-md flex justify-center overflow-hidden w-full">
      <iframe
        :src="data.url"
        height="500px"
        width="800px"
        frameborder="0"
        allowfullscreen
        class=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Videos',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    data: Object
  },
  data () {
    return {}
  },
  methods: {
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('videos', e)
    }
  }
}
</script>
