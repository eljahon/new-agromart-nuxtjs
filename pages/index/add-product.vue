<template>
  <div>
    <div class="max-w-7xl mx-auto py-6 px-6 lg:px-8">
      <breadcrumbs :items="items" />
    </div>
    <div class="container max-w-4xl mx-auto p-6 bg-white rounded-md">
      <div class="pb-5 border-b-2 border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          {{ $t('text.adInfo') }}
        </h3>
        <p class="text-sm font-normal text-gray-500 mt-1">
          {{ $t('text.adTitle') }}
        </p>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }" slim>
        <form class="space-y-4" novalidate @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="{ errors }"
            name="product_type"
            :rules="{ required: true }"
            mode="eager"
            class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1 gap-4"
          >
            <label
              class="text-sm text-medium text-gray-700 col-span-1"
              for="sell"
            >{{ $t('text.adType') }}</label>
            <div class="max-w-xs sm:col-span-2 col-span-1 muto sm:w-full">
              <select
                v-model="trade.type_id"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : trade.type_id
                      ? 'border-green-600'
                      : 'border-gray-500'
                "
                class="text-sm text-gray-900 font-normal w-full rounded-md h-9"
                name="sellProduct"
              >
                <option
                  v-for="(type, index) in tradingType"
                  :key="index"
                  class="text-sm text-gray-600 font-normal"
                  :value="type.id"
                >
                  {{ type.name[$i18n.locale] }}
                </option>
              </select>
            </div>
          </ValidationProvider>
          <div class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1 gap-4">
            <ValidationProvider
              v-slot="{ errors }"
              name="category"
              :rules="{ required: true }"
              mode="eager"
              class="
                md:flex
                items-start
                lg:gap-24
                md:gap-16 md:space-y-0
                space-y-3
                sm:col-span-3
                col-span-1
              "
            >
              <label class="text-sm text-medium text-gray-700 col-span-1 mb-4">{{ $t('word.category') }}</label>
              <div class="max-w-xs flex justify-start muto sm:w-full">
                <select
                  v-model="category"
                  :class="
                    errors.length > 0
                      ? 'border-red-400'
                      : category
                        ? 'border-green-600'
                        : 'border-gray-500'
                  "
                  class="text-sm text-gray-900 font-normal w-full rounded-md h-9"
                >
                  <option
                    v-for="(el, index) in categories"
                    :key="index"
                    class="text-sm text-gray-600 font-normal"
                    :value="el.id"
                  >
                    {{ el.title[$i18n.locale] }}
                  </option>
                </select>
              </div>
            </ValidationProvider>
            <!-- <ValidationProvider
              v-if="subcategories.length > 0"
              v-slot="{ errors }"
              name="product_type"
              :rules="{ required: true }"
              mode="eager"
              class="max-w-xs sm:col-span-2 col-span-1 muto sm:w-full"
            >
              <select
                v-model="subcategory"
                :disabled="!category"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : subcategory
                      ? 'border-green-600'
                      : 'border-gray-500'
                "
                class="text-sm text-gray-500 font-normal w-full rounded-md h-9"
              >
                <option
                  v-for="(el, index) in subcategories"
                  :key="index"
                  class="text-sm text-gray-600 font-normal"
                  :value="el.id"
                >
                  {{ el.name[$i18n.locale] }}
                </option>
              </select>
            </ValidationProvider> -->
          </div>
          <ValidationProvider
            v-slot="{ errors }"
            name="product_type"
            :rules="{ required: true }"
            mode="eager"
            class="py-5 border-b-2 grid sm:grid-cols-5 grid-cols-1"
          >
            <label class="text-sm text-medium mb-4 text-gray-700 col-span-1">{{ $t('text.adName') }}</label>
            <div class="max-w-2xl sm:col-span-4 col-span-1 muto sm:w-full">
              <input
                v-model="text.title"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : text.title.length > 0
                      ? 'border-green-600'
                      : 'border-gray-500'
                "
                class="w-full rounded-md placeholder-gray-500::placeholder h-9"
                type="text"
                placeholder="Misol: Qizil sabzi sotiladi"
              >
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="comment"
            :rules="{ required: true }"
            mode="eager"
            class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1"
          >
            <label class="text-sm text-medium mb-4 text-gray-700 col-span-1" for="comment">
              {{ $t('word.detailed') }}</label>
            <div class="max-w-2xl sm:col-span-4 col-span-1 muto sm:w-full">
              <textarea
                v-model="text.description"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : text.description.length > 0
                      ? 'border-green-600'
                      : 'border-gray-500'
                "
                class="w-full resize-none rounded-md placeholder-gray-500::placeholder"
                rows="4"
                type="text"
                placeholder="E'lon haqida qisqacha ma'lumot"
              />
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="payment type"
            :rules="{ required: true }"
            mode="eager"
            class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1"
          >
            <label
              class="text-sm text-medium mb-4 text-gray-700 col-span-1"
              for="payment type"
            >{{ $t('text.priceType') }}</label>
            <div class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full">
              <select
                v-model="trade.payment_type_id"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : trade.payment_type_id
                      ? 'border-green-600'
                      : 'border-gray-500'
                "
                class="text-sm text-gray-900 font-normal w-full rounded-md border-gray-300 h-9"
                name="sellProduct"
              >
                <option
                  v-for="(el, index) in payment"
                  :key="index"
                  class="text-sm text-gray-600 font-normal"
                  :value="el.id"
                >
                  {{ el.namejson[$i18n.locale] }}
                </option>
              </select>
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-if="trade.payment_type_id === 1"
            v-slot="{ errors }"
            name="price"
            :rules="{ required: true }"
            mode="eager"
            class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1"
          >
            <label
              class="text-sm text-medium mb-4 text-gray-700 col-span-1"
              for="price"
            >{{ $t('word.price') }}</label>
            <div class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full">
              <input
                v-model="trade.price"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : trade.price
                      ? 'border-green-600'
                      : 'border-gray-500'
                "
                class="w-full rounded-md border-gray-300 h-9"
                type="number"
                placeholder="Narxi"
              >
            </div>
          </ValidationProvider>
          <div class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1">
            <label
              class="text-sm text-medium mb-4 text-gray-700 col-span-1"
              for="price"
            >{{ $t('word.quantity') }}</label>
            <ValidationProvider
              v-slot="{ errors }"
              name="quantity"
              :rules="{ required: true }"
              mode="eager"
              class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full"
            >
              <input
                v-model="trade.count"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : trade.price
                      ? 'border-green-600'
                      : 'border-gray-500'
                "
                class="w-full rounded-md border-gray-300 h-9"
                type="number"
                placeholder=""
              >
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="unit"
              :rules="{ required: true }"
              mode="eager"
              class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full"
            >
              <select
                v-model="trade.unit_id"
                :class="
                  errors.length > 0
                    ? 'border-red-400'
                    : trade.unit_id
                      ? 'border-green-600'
                      : 'border-gray-500'
                "
                class="text-sm text-gray-900 font-normal ml-1 w-36 rounded-md h-9"
              >
                <option
                  v-for="(el, index) in unit"
                  :key="index"
                  class="text-sm text-gray-600 font-normal w-36"
                  :value="el.id"
                >
                  {{ el.namejson[$i18n.locale] }}
                </option>
              </select>
            </ValidationProvider>
          </div>
          <div class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1 gap-4">
            <div
              class="text-sm font-medium text-gray-700 col-span-1"
            >
              {{ $t('word.delivery') }} <br> <p class="lowercase">
                {{ $t('word.params') }}
              </p>
            </div>
            <div class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full flex">
              <input
                id="takeaway"
                v-model="trade.delivery_type"
                name="takeaway"
                :value="0"
                class="rounded"
                type="radio"
              >
              <div class="transform -translate-y-1 ml-1">
                <label class="text-sm font-medium text-gray-700 col-span-1">{{ $t('word.delivery') }}</label>
                <p class="text-sm text-gray-500 font-normal">
                  {{ $t('text.deliveryTitle') }}
                </p>
              </div>
            </div>
            <div class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full flex">
              <input
                id="delivery"
                v-model="trade.delivery_type"
                name="delivery"
                :value="1"
                class="rounded"
                type="radio"
              >
              <div class="transform -translate-y-1 ml-1">
                <label class="text-sm font-medium text-gray-700 col-span-1">{{ $t('text.pickUp') }}</label>
                <p class="text-sm text-gray-500 font-normal">
                  {{ $t('text.pickUpTitle') }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="trade.delivery_type === 0"
            class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1 gap-4"
          >
            <label
              class="text-sm font-medium text-gray-700 col-span-1"
              for="announcementComment"
            >{{ $t('text.deliveryArea') }}</label>
            <div class="max-w-2xl sm:col-span-4 col-span-1 muto sm:w-full">
              <div class="w-full flex flex-col items-center mx-auto relative">
                <div class="w-full">
                  <div class="my-2 p-1 flex border border-gray-200 bg-white rounded">
                    <div class="flex flex-auto flex-wrap">
                      <div
                        v-for="(selectedRegion, index) in selectedRegions"
                        :key="index"
                        class="
                          flex
                          justify-center
                          items-center
                          m-1
                          font-medium
                          py-1
                          px-2
                          rounded-full
                          text-green-700
                          bg-green-100
                          border border-green-300
                        "
                      >
                        <div
                          class="
                            text-xs
                            font-normal
                            leading-none
                            max-w-full
                            flex-initial
                            text-green-800
                          "
                        >
                          {{ selectedRegion.name[$i18n.locale] }}
                        </div>
                        <div
                          class="flex flex-auto flex-row-reverse"
                          @click="removeRegion(selectedRegion)"
                        >
                          <i
                            class="
                              bx bx-x
                              cursor-pointer
                              hover:text-green-400
                              text-green-800
                              rounded-full
                            "
                          />
                        </div>
                      </div>
                      <div class="flex-1">
                        <input
                          placeholder=""
                          class="
                            bg-transparent
                            p-1
                            px-2
                            appearance-none
                            outline-none
                            h-full
                            w-full
                            text-gray-800
                          "
                        >
                      </div>
                    </div>
                    <div
                      class="
                        text-gray-300
                        w-8
                        py-1
                        pl-2
                        pr-1
                        border-l
                        flex
                        items-center
                        border-gray-200
                      "
                    >
                      <div
                        id="show-region"
                        type="show-region"
                        class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                        @click="multiselectShowHide"
                      >
                        <i v-if="!isMultiselectOpened" class="w-4 h-4 bx bx-chevron-down" />
                        <i v-else class="w-4 h-4 bx bx-chevron-up" />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="isMultiselectOpened"
                  class="
                    absolute
                    shadow
                    mt-14
                    bg-white
                    z-40
                    w-full
                    lef-0
                    rounded
                    max-h-select
                    overflow-y-auto
                  "
                >
                  <div class="flex flex-col w-full">
                    <div
                      v-for="(region, index) in regions"
                      :key="index"
                      class="
                        cursor-pointer
                        w-full
                        border-gray-100
                        rounded-t
                        border-b
                        hover:bg-green-100
                      "
                      @click="addToSelectedRegions(region)"
                    >
                      <div
                        class="
                          flex
                          w-full
                          items-center
                          p-2
                          pl-2
                          border-transparent border-l-2
                          relative
                        "
                        :class="region.selected ? 'border-green-600' : ''"
                      >
                        <div class="w-full items-center flex">
                          <div class="mx-2 leading-6">
                            {{ region.name[$i18n.locale] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1 gap-4">
            <label
              class="text-sm font-medium text-gray-700 col-span-1 w-full mx-auto"
              for="announcementComment"
            >{{ $t('text.photoGallery') }}</label>
            <div class="sm:col-span-4 col-span-5">
              <label class="w-full h-full" for="imageUploader">
                <div
                  class="
                    border-dashed
                    relative
                    cursor-pointer
                    border-2
                    h-36
                    rounded-md
                    border-gray-300
                  "
                >
                  <div class="flex items-center justify-center mt-8">
                    <p class="text-sm block font-medium text-gray-600">
                      <img src="~/assets/images/image.png" class="w-12">
                      <label
                        for="gallaryAddPicture"
                        class="text-yellow-600 cursor-pointer"
                      >{{ $t('word.download') }}</label>
                    </p>
                    <input
                      id="gallaryAddPicture"
                      ref="gallary"
                      style="display: none"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      @change="previewGallery"
                    >
                  </div>
                </div>
                <div class="grid grid-cols-5 gap-4 mt-5">
                  <div v-for="(data, index) in galleryImage" :key="index" class="gallery relative">
                    <img class="hover:opacity-70 rounded-md" :src="data.image">
                    <button
                      type="deleteImage"
                      class="absolute top-1/3 left-1/3 opacity-0 trash"
                      @click="deleteGallaryImage(data)"
                    >
                      <i class="bx bx-trash text-2xl text-red-500" />
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div class="py-5 flex gap-4 justify-end">
            <button
              class="
                bg-white
                px-4
                py-2
                font-medium
                border
                text-gray-700
                border-gray-300
                rounded-md
                hover:opacity-90
              "
            >
              {{ $t('word.cancel') }}
            </button>
            <button
              type="submit"
              class="
                bg-green-600
                px-4
                py-2
                font-medium
                border border-green-600
                rounded-md
                text-white
                hover:opacity-90
              "
            >
              {{ $t('word.announcement') }}
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
// import AxiosInit from '~/utils/axios_init'
export default {
  auth: true,
  components: { Breadcrumbs },
  data () {
    return {
      categories: [],
      tradingType: [],
      payment: [],
      unit: [],
      galleryImage: [],
      delivery: [],
      regions: [],
      selectedRegions: [],
      isMultiselectOpened: false,
      trade: {
        type_id: null,
        category_id: null,
        title: {
          uz: '',
          ru: '',
          en: ''
        },
        description: {
          uz: '',
          ru: '',
          en: ''
        },
        payment_type_id: null, // or agreement
        price: null,
        count: null,
        delivery_type: null,
        delivery_region_ids: '',
        status: 'archived',
        unit_id: null,
        author_id: null
      },
      text: {
        title: '',
        description: ''
      },
      category: null,
      subcategory: null,
      subcategories: [],
      img: null,
      product_type: '',
      price_type: '',
      product_name: '',
      comment: '',
      price: '',
      total: '',
      city: '',
      district: '',
      phone: '',
      items: [
        { text: 'text.tradingFloor', link: '/trading', disabled: false },
        { text: 'word.announcement', link: '/my-products/new', disabled: true }
      ],
      isImageChange: false
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.user
    })
  },
  watch: {
    selectedRegions () {
      this.trade.delivery_region_ids = ''
      for (let index = 0; index < this.selectedRegions.length; index++) {
        this.trade.delivery_region_ids =
          this.trade.delivery_region_ids +
          this.selectedRegions[index].id +
          `${this.selectedRegions.length - 1 === index ? '' : ','}`
      }
    },
    category () {
      this.categories.forEach((el) => {
        if (el.id === this.category) {
          this.subcategories = el.childs
        }
      })
    },
    'trade.delivery_type' () {
      if (this.trade.delivery_type !== 1) {
        this.selectedRegions.length = []
        this.trade.delivery_region_ids = ''
      }
    },
    'text.title' () {
      if (this.text.title.length > 0) {
        this.trade.title.uz = this.text.title
        this.trade.title.ru = this.text.title
        this.trade.title.en = this.text.title
      }
    },
    'text.description' () {
      if (this.text.description.length > 0) {
        this.trade.description.uz = this.text.description
        this.trade.description.ru = this.text.description
        this.trade.description.en = this.text.description
      }
    }
  },
  mounted () {
    this.fetchDirectories()
  },

  methods: {
    addToSelectedRegions (item) {
      const index = this.selectedRegions.findIndex(el => el.id === item.id)
      const regionInd = this.regions.findIndex(el => el.id === item.id)
      if (index >= 0) {
        // eslint-disable-next-line no-console
        console.log('This region already selected')
        return
      }
      this.regions[regionInd].selected = true
      this.selectedRegions.push(item)
    },
    removeRegion (item) {
      const index = this.selectedRegions.findIndex(el => el.id === item.id)
      const regionInd = this.regions.findIndex(el => el.id === item.id)
      this.selectedRegions.splice(index, 1)
      this.regions[regionInd].selected = false
    },
    multiselectShowHide () {
      this.isMultiselectOpened = !this.isMultiselectOpened
    },
    previewGallery () {
      const token = this.$auth.getToken('local')
      const input = this.$refs.gallary.files[0]
      if (input === undefined) {
        return
      }
      const formData = new FormData()
      formData.append('file', input)
      this.$axios
        .post('/media/create/', formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.galleryImage.push({ image: res.data.file })
          this.isImageChange = true
        })
    },
    deleteGallaryImage (data) {
      const copyGallery = [...this.galleryImage]
      for (let i = 0; i < this.galleryImage.length; i++) {
        if (data.image === this.galleryImage[i].image) {
          copyGallery.splice(i, 1)
        }
      }
      this.galleryImage = [...copyGallery]
      this.isImageChange = true
    },
    onSubmit () {
      this.trade.category_id = this.subcategory > 0 ? this.subcategory : this.category
      if (this.trade.id) {
        delete this.trade.category
        delete this.trade.payment_type
        delete this.trade.type
        delete this.trade.unit
        delete this.trade.author
      }
      this.trade.author_id = this.currentUser.id
      this.$store
        .dispatch(this.trade.id ? `crud/trading/updateTrading/${this.trade.id}` : 'crud/trading/updateTrading', {
          data: this.trade
        })
        .then((res) => {
          this.galleryImage[0].is_main = true
          if (this.isImageChange) {
            this.galleryImage.forEach((image) => {
              image.post = res
              this.$store.dispatch('post/image/postPostImage', {
                data: image
              })
            })
          }
          if (this.trade.id) {
            this.$snotify.warning('Updated trading')
          } else {
            this.$snotify.success('Added new trading')
          }
          this.$router.push(this.localePath('/my-products'))
        })
        .catch((error) => {
          this.$snotify.error(error)
        })
    },

    async fetchDirectories () {
      await this.$store.dispatch('crud/trading/type/getTradingType').then((res) => {
        this.tradingType = res
      })
      await this.$store.dispatch('crud/trading/category/getTradingCategory').then((res) => {
        this.categories = res
      })
      await this.$store.dispatch('crud/trading/price/getPriceType').then((res) => {
        this.payment = res
      })
      await this.$store.dispatch('crud/trading/unit/getTradingUnit').then((res) => {
        this.unit = res
      })
      // await this.$store.dispatch('post/delivery/getPostDelivery').then((res) => {
      //   this.delivery = res
      // })
      await this.$store.dispatch('crud/region/getRegion').then((res) => {
        this.regions = res
        this.regions.forEach((region) => {
          region.selected = false
          for (let i = 0; i < this.selectedRegions.length; i++) {
            if (region.id === this.selectedRegions[i].id) {
              region.selected = true
            }
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.gallery:hover .trash {
  opacity: 100;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>>
