<template>
  <div>
    <LightGallery
      :images="
        photos.map((photo) => {
          return $tools.getFileUrl(photo);
        })
      "
      :index="index"
      :disable-scroll="true"
      @close="handleHide()"
    />
  </div>
</template>
<script>
/* eslint-disable vue/no-mutating-props */
// import { LightGallery } from 'vue-light-gallery'
export default {
  components: {
    // LightGallery
  },
  props: {
    photos: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: () => null
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    handleHide () {
      this.index = null
      this.isOpen = false
    }
  }
}
</script>
