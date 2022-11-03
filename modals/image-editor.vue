<template>
  <div class="p-4">
    <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
      <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
        {{ $t('word.image') }}
      </h3>
      <button
        type="button"
        class="
          text-gray-400
          bg-transparent
          hover:bg-gray-200 hover:text-gray-900
          rounded-lg
          text-sm
          p-1.5
          ml-auto
          inline-flex
          items-center
          dark:hover:bg-gray-600 dark:hover:text-white
        "
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
    </div>
    <div style="position: relative">
      <div class="image_progress">
        <div
          v-if="uploading.show && uploading.percent > 0 && uploading.percent < 100"
          class="shadow w-full bg-grey-light mt-2"
        >
          <div
            class="bg-teal text-xs leading-none py-1 text-center text-white"
            :style="`width: ${uploading.percent}%`"
          >
            {{ uploading.percent }}%
          </div>
        </div>
      </div>
      <div v-if="img" class="toolbar">
        <span class="font-medium icon" @click="$refs.cropper.zoom(2)">
          <i class="bx bx-plus-circle" />
        </span>
        <span class="font-medium icon" @click="$refs.cropper.zoom(0.5)">
          <i class="bx bx-minus-circle" />
        </span>
        <span class="font-medium icon" @click="$refs.cropper.rotate(-90)">
          <i class="bx bx-rotate-left" />
        </span>
        <span class="font-medium icon" @click="$refs.cropper.rotate(90)">
          <i class="bx bx-rotate-right" />
        </span>
        <span class="font-medium icon" @click="$refs.cropper.flip(true)">
          <i class="bx bx-horizontal-center" />
        </span>
        <span class="font-medium icon" @click="$refs.cropper.flip(false, true)">
          <i class="bx bx-vertical-center" />
        </span>
        <span class="font-medium icon" @click="center">
          <i class="bx bx-collapse" />
        </span>
        <span class="font-medium icon" @click="full">
          <i class="bx bx-expand" />
        </span>
      </div>
      <div v-if="!img" class="crop_placeholder">
        <img :src="image" alt="">
      </div>
      <cropper
        v-if="img"
        ref="cropper"
        class="cropper"
        :src="img"
        :auto-zoom="true"
        :stencil-size="settings.stencil.size"
        image-restriction="stencil"
        :stencil-props="settings.stencil.props"
        @change="change"
      />
    </div>
    <div
      class="flex p-6 s space-x-2 w-full rounded-b border-t border-gray-200 dark:border-gray-600"
    >
      <button
        class="
          mr-2
          inline-flex
          items-center
          px-2.5
          py-1.5
          border border-transparent
          text-xs
          font-medium
          rounded
          text-blue-700
          bg-blue-100
          hover:bg-blue-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        "
        @click="$refs.file.click()"
      >
        {{ $t('word.upload') }}
      </button>
      <div style="display: flex">
        <button
          class="
            mr-2
            inline-flex
            items-center
            px-2.5
            py-1.5
            border border-transparent
            text-xs
            font-medium
            rounded
            text-red-700
            bg-red-100
            hover:bg-red-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          "
          @click="hide"
        >
          {{ $t('word.cancel') }}
        </button>
        <button
          v-if="img"
          class="
            mr-2
            inline-flex
            items-center
            px-2.5
            py-1.5
            border border-transparent
            text-xs
            font-medium
            rounded
            text-red-700
            bg-red-100
            hover:bg-red-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          "
          @click="img = null"
        >
          {{ $t('word.clear') }}
        </button>
        <button
          v-if="img"
          class="
            mr-2
            inline-flex
            items-center
            px-2.5
            py-1.5
            border border-transparent
            text-xs
            font-medium
            rounded
            text-green-700
            bg-green-100
            hover:bg-green-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
          "
          @click="uploadImage"
        >
          {{ $t('word.save') }}
        </button>
      </div>
    </div>
    <input ref="file" type="file" accept="image/*" style="display: none" @change="loadImage">
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import { mapGetters } from 'vuex'
import image from '../assets/svg/image.svg'
import 'vue-advanced-cropper/dist/style.css'
// import store from "../store";
export default {
  name: 'ImageEditor',
  components: {
    Cropper
  },
  props: {
    type: {
      type: String,
      default: () => '4:3'
    },
    url: {
      type: String,
      default: () => null
    }
  },
  data () {
    return {
      image,
      img: null,
      loadedImage: null,
      media_id: null,
      isOpen: false,
      settings: {
        stencil: {
          size: {
            width: 1920,
            height: 1080
          },
          props: {
            aspectRatio: 4 / 3,
            movable: false
          }
        },
        restriction: 'stencil'
      }
    }
  },
  computed: {
    ...mapGetters({
      uploading: 'upload/uploading'
    })
  },
  mounted () {
    this.open()
  },
  methods: {
    open () {
      this.loadedImage = this.$tools.getFileUrl(this.url)
      this.img = this.$tools.getFileUrl(this.url)
      if (this.type === 'avatar') {
        this.settings.stencil.size = {
          width: 1080,
          height: 1080
        }
        this.settings.stencil.props = {
          aspectRatio: 1
        }
      }
      if (this.type === 'patent') {
        this.settings.stencil.size = {
          width: 1080,
          height: 1500
        }
        this.settings.stencil.props = {
          aspectRatio: 18 / 25
        }
      }
      if (this.type === 'passport') {
        this.settings.stencil.size = {
          width: 840,
          height: 1080
        }
        this.settings.stencil.props.aspectRatio = 7 / 10
      }
      if (this.type === 'banner') {
        this.settings.stencil.size = {
          width: 1232,
          height: 296
        }
        this.settings.stencil.props.aspectRatio = 154 / 37
      }
      if (this.type === 'image') {
        this.settings.stencil.size = {
          width: 1920,
          height: 1080
        }
        this.settings.stencil.props.aspectRatio = 16 / 9
      }
      if (this.type === '4:3') {
        this.settings.stencil.size = {
          width: 1920,
          height: 1440
        }
        this.settings.stencil.props.aspectRatio = 16 / 9
      }
      this.isOpen = true
    },
    clear () {
      this.img = null
      this.media_id = null
    },
    hide () {
      this.$store
        .dispatch('upload/uploadingAction', {
          show: false,
          percent: 0
        })
        .then(() => {
          this.clear()
          this.onClose('canceled')
        })
    },
    uploaderType (data) {
      this.$store.dispatch('upload/uploadFile', data).then((res) => {
        this.$store.dispatch('upload/uploadingAction', {
          show: false,
          percent: 0
        })
        this.onClose({
          large: res.data[0].formats && res.data[0].formats.large ? this.$tools.cropUrl(res[0].formats.large.url) : null,
          medium: res.data[0].formats && res.data[0].formats.medium ? this.$tools.cropUrl(res[0].formats.medium.url) : null,
          small: res.data[0].formats && res.data[0].formats.small ? this.$tools.cropUrl(res[0].formats.small.url) : null,
          thumbnail: res.data[0].formats && res.data[0].formats.thumbnail ? this.$tools.cropUrl(res[0].formats.thumbnail.url) : null,
          url: res.data[0].url ? this.$tools.cropUrl(res.data[0].url) : null
        })
      })
    },
    uploadImage () {
      const { canvas } = this.$refs.cropper.getResult()
      if (canvas) {
        const form = new FormData()
        canvas.toBlob((blob) => {
          blob.name = `image-${blob.size}.jpg`
          form.append('files', blob)
          this.uploaderType(form)
        }, 'image/jpeg')
      }
    },
    center () {
      this.$refs.cropper.setCoordinates(({ coordinates, imageSize }) => ({
        left: imageSize.width / 2 - coordinates.width / 2,
        top: imageSize.height / 2 - coordinates.height / 2
      }))
    },
    full () {
      this.$refs.cropper.setCoordinates(({ coordinates, imageSize }) => ({
        width: imageSize.width,
        height: imageSize.height
      }))
    },
    loadImage (e) {
      const { files } = e.target
      if (files && files[0]) {
        const blob = URL.createObjectURL(files[0])
        this.img = blob
      }
    },
    change (e) {
      // image url
      // console.log(e.canvas.toDataURL())
    },
    zoom (val) {
      setTimeout(() => {
        this.$refs.cropper.zoom(val)
      }, 1)
    },
    onClose (data) {
      this.$emit('close')
      this.$root.$emit('image-editor-modal', data)
    }
  }
}
</script>

<style scoped>
.preview {
  border: dashed 1px rgba(255, 255, 255, 0.25);
}
.image_progress .progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  background-color: rgba(243, 243, 243, 0.1);
  height: 15px;
}
.toolbar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  margin-top: 5px;
  z-index: 5;
  align-content: space-evenly;
}
.icon {
  color: white;
  text-align: center;
  font-size: 20px;
  margin: 2px 0;
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: all, 0.3s;
}
.toolbar .icon:hover {
  text-shadow: 5px 5px 5px #ffffff, -2px 1px 10px #ffffff;
  border-radius: 5px;
}
.cropper {
  height: 450px;
}
.crop_placeholder {
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
