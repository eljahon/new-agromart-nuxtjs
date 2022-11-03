<template>
  <div>
    <div class="max-w-7xl mx-auto py-6 px-6 lg:px-8">
      <breadcrumbs :items="items" />
    </div>
    <div class="container max-w-4xl mx-auto bg-white rounded-md p-6">
      <div class="pb-5 border-b-2 border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          {{ $t("text.adInfo") }}
        </h3>
        <p class="text-sm font-normal text-gray-500 mt-1">
          {{ $t("text.adTitle") }}
        </p>
      </div>
      <div
        class="
          py-5
          border-b-2 border-gray-200
          grid
          sm:grid-cols-5
          grid-cols-1
          gap-4
        "
      >
        <label
          class="text-sm text-medium text-gray-700 col-span-1"
          for="product_type"
          >{{ $t("text.adType") }}</label
        >
        <div
          v-for="(type, index) in tradingType"
          :key="index"
          class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full flex"
        >
          <input
            :id="`posttype-${type.id}`"
            v-model.trim="$v.trade.tradingposttype.$model"
            name="postype"
            :value="type"
            :class="
              $v.trade.tradingposttype.length > 0
                ? 'border-red-400'
                : $v.trade.tradingposttype.$model
                ? 'border-green-600'
                : 'border-gray-500'
            "
            class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
            type="radio"
          />
          <label
            :for="`posttype-${type.id}`"
            class="transform -translate-y-1 ml-1"
          >
            <div class="text-sm font-medium text-gray-700 col-span-1">
              {{ type.name[$i18n.locale] }}
            </div>
          </label>
        </div>
      </div>
      <div
        class="
          py-5
          border-b-2 border-gray-200
          grid
          sm:grid-cols-5
          grid-cols-1
          gap-4
        "
      >
        <div
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
          <label class="text-sm text-medium text-gray-700 col-span-1 mb-4">{{
            $t("word.category")
          }}</label>
          <div class="max-w-xs flex justify-start muto sm:w-full">
            <select
              id="category_id"
              v-model.trim="$v.category.$model"
              :class="
                $v.category.length > 0
                  ? 'border-red-400 border'
                  : $v.category.$model
                  ? 'border-green-600'
                  : 'border-gray-500'
              "
              class="text-sm text-gray-900 font-normal w-full rounded-md h-9"
            >
              <option
                v-for="(el, index) in categories"
                :key="index"
                class="text-sm text-gray-600 font-normal"
                :value="el"
              >
                {{ el.title[$i18n.locale] }}
              </option>
            </select>
          </div>
        </div>
        <div
          v-if="subcategories.length > 0"
          class="max-w-xs sm:col-span-2 col-span-1 muto sm:w-full"
        >
          <select
            v-model.trim="$v.subcategory.$model"
            :disabled="!category"
            :class="
              $v.subcategory.length > 0
                ? 'border-red-400'
                : $v.subcategory.$model
                ? 'border-green-600'
                : 'border-gray-500'
            "
            class="text-sm text-gray-500 font-normal w-full rounded-md h-9"
          >
            <option
              v-for="(el, index) in subcategories"
              :key="index"
              class="text-sm text-gray-600 font-normal"
              :value="el"
            >
              {{ el.title[$i18n.locale] }}
            </option>
          </select>
        </div>
      </div>
      <div class="py-5 border-b-2 grid sm:grid-cols-5 grid-cols-1">
        <label class="text-sm text-medium mb-4 text-gray-700 col-span-1">{{
          $t("text.adName")
        }}</label>
        <div class="max-w-2xl sm:col-span-4 col-span-1 muto sm:w-full">
          <input
            id="title"
            v-model.trim="$v.text.title.$model"
            :class="
              $v.text.title.length > 0
                ? 'border-red-400'
                : $v.text.title.$model
                ? 'border-green-600'
                : 'border-gray-500'
            "
            class="w-full rounded-md placeholder-gray-500::placeholder h-9"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div
        class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1"
      >
        <label
          class="text-sm text-medium mb-4 text-gray-700 col-span-1"
          for="comment"
        >
          {{ $t("word.detailed") }}</label
        >
        <div class="max-w-2xl sm:col-span-4 col-span-1 muto sm:w-full">
          <textarea
            id="description"
            v-model.trim="$v.text.description.$model"
            :class="
              $v.text.description.length > 0
                ? 'border-red-400'
                : $v.text.description.$model
                ? 'border-green-600'
                : 'border-gray-500'
            "
            class="
              w-full
              resize-none
              rounded-md
              placeholder-gray-500::placeholder
            "
            rows="4"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div
        class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1"
      >
        <label
          class="text-sm text-medium mb-4 text-gray-700 col-span-1"
          for="payment type"
          >{{ $t("text.priceType") }}</label
        >
        <div
          v-for="(type, index) in payment"
          :key="index"
          class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full flex"
        >
          <input
            :id="`pricetype-${type.id}`"
            v-model.trim="$v.trade.tradingpricetype.$model"
            name="pricetype"
            :value="type"
            :class="
              $v.trade.tradingpricetype.length > 0
                ? 'border-red-400'
                : $v.trade.tradingpricetype.$model
                ? 'border-green-600'
                : 'border-gray-500'
            "
            type="radio"
          />
          <label
            :for="`pricetype-${type.id}`"
            class="transform -translate-y-1 ml-1"
          >
            <div class="text-sm font-medium text-gray-700 col-span-1">
              {{ type.namejson[$i18n.locale] }}
            </div>
          </label>
        </div>
      </div>
      <div
        v-if="trade.tradingpricetype && trade.tradingpricetype.id === 1"
        class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1"
      >
        <label
          class="text-sm text-medium mb-4 text-gray-700 col-span-1"
          for="price"
          >{{ $t("word.price") }}</label
        >
        <div class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full">
          <input
            id="price"
            v-model.trim="trade.price"
            :class="
              !trade.price
                ? 'border-red-400'
                : trade.price
                ? 'border-green-600'
                : 'border-gray-500'
            "
            class="w-full rounded-md border-gray-300 h-9"
            type="number"
            placeholder=""
            min="0"
          />
        </div>
      </div>
      <div
        class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1"
      >
        <label
          class="text-sm text-medium mb-4 text-gray-700 col-span-1"
          for="price"
          >{{ $t("word.quantity") }}</label
        >
        <div class="max-w-2xl col-span-2 md:col-span-1 muto sm:w-full">
          <input
            id="count"
            v-model.trim="$v.trade.count.$model"
            :class="
              $v.trade.count.length > 0
                ? 'border-red-400'
                : $v.trade.count.$model
                ? 'border-green-600'
                : 'border-gray-500'
            "
            class="w-full rounded-md border-gray-300 h-9"
            type="number"
            min="0"
            placeholder=""
          />
        </div>
        <div class="max-w-2xl col-span-2 md:col-span-1 md:mt-0 mt-2 w-full">
          <select
            id="unit"
            v-model.trim="$v.trade.unit.$model"
            :class="
              $v.trade.unit.length > 0
                ? 'border-red-400'
                : $v.trade.unit.$model
                ? 'border-green-600'
                : 'border-gray-500'
            "
            class="
              text-sm text-gray-900
              font-normal
              md:ml-2
              ml-0
              rounded-md
              h-9
            "
          >
            <option
              v-for="(el, index) in unit"
              :key="index"
              class="text-sm text-gray-600 font-normal w-36"
              :value="el"
            >
              {{ el.namejson[$i18n.locale] }}
            </option>
          </select>
        </div>
      </div>
      <div
        class="
          py-5
          border-b-2 border-gray-200
          grid
          sm:grid-cols-5
          grid-cols-1
          gap-4
        "
      >
        <div class="text-sm font-medium text-gray-700 col-span-1">
          {{ $t("word.delivery") }} <br />
          <p class="lowercase">
            {{ $t("word.params") }}
          </p>
        </div>
        <div class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full flex">
          <input
            id="delivery"
            v-model="trade.hasdelivery"
            name="delivery"
            :value="true"
            class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
            type="radio"
          />
          <label for="delivery" class="transform -translate-y-1 ml-1">
            <div class="text-sm font-medium text-gray-700 col-span-1">
              {{ $t("word.delivery") }}
            </div>
            <p class="text-sm text-gray-500 font-normal">
              {{ $t("text.deliveryTitle") }}
            </p>
          </label>
        </div>
        <div class="max-w-2xl sm:col-span-2 col-span-1 muto sm:w-full flex">
          <input
            id="takeaway"
            v-model="trade.hasdelivery"
            name="takeaway"
            :value="false"
            class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
            type="radio"
          />
          <label for="takeaway" class="transform -translate-y-1 ml-1">
            <div class="text-sm font-medium text-gray-700 col-span-1">
              {{ $t("text.pickUp") }}
            </div>
            <p class="text-sm text-gray-500 font-normal">
              {{ $t("text.pickUpTitle") }}
            </p>
          </label>
        </div>
      </div>
      <div
        class="py-5 border-b-2 border-gray-200 grid sm:grid-cols-5 grid-cols-1"
      >
        <label
          class="text-sm text-medium mb-4 text-gray-700 col-span-1"
          for="price"
          >{{ $t("text.goodRegion") }}</label
        >
        <select
          id="userregion"
          v-model.trim="$v.trade.userregion.$model"
          :class="
            $v.trade.userregion.length > 0
              ? 'border-red-400'
              : $v.trade.userregion.$model
              ? 'border-green-600'
              : 'border-gray-500'
          "
          class="
            text-sm text-gray-900
            font-normal
            md:ml-2
            ml-0
            rounded-md
            h-9
            max-w-2xl
            md:mt-0
            mt-2
            w-full
            sm:col-span-4
            col-span-1
            sm:w-full
          "
        >
          <option
            v-for="(el, index) in regions"
            :key="index"
            class="text-sm text-gray-600 font-normal w-36"
            :value="el.id"
          >
            {{ el.name }}
          </option>
        </select>
      </div>
      <div
        v-if="trade.hasdelivery"
        class="
          py-5
          border-b-2 border-gray-200
          grid
          sm:grid-cols-5
          grid-cols-1
          gap-4
        "
      >
        <label
          class="text-sm font-medium text-gray-700 col-span-1"
          for="announcementComment"
          >{{ $t("text.deliveryArea") }}</label
        >
        <div class="max-w-2xl sm:col-span-4 col-span-1 muto sm:w-full">
          <v-select
            id="deliverableregions"
            label="name"
            value="id"
            v-model="trade.deliverableregions"
            :options="regions"
            :reduce="(region) => region.id"
            :multiple="true"
          ></v-select>
          <alert-error
            v-if="isAlert"
            class="mt-2"
            text="Yetkazib berish joylarini tanlang"
            @onCloseAlert="closeAlert()"
          />
          <!-- <div class="w-full flex flex-col items-center mx-auto relative">
            <div class="w-full">
            </div>
            <div
              v-click-outside="hideDropdownButton"
              class="w-full"
              @click="multiselectShowHide"
            >
              <div class="my-2 p-1 flex border border-gray-200 bg-white rounded">
                <div class="flex flex-auto flex-wrap">
                  <div
                    v-for="(selectedRegion, index) in trade.deliverableregions"
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
                      :readonly="true"
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
                    class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  >
                    <i v-if="!isMultiselectOpened" class="w-4 h-4 bx bx-chevron-down" />
                    <i v-else class="w-4 h-4 bx bx-chevron-up" />
                  </div>
                </div>
              </div>
            </div>
            <div
              v-show="isMultiselectOpened"
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
                  v-for="(region, index) in deliveryRegions"
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
          </div> -->
        </div>
      </div>
      <div
        class="
          py-5
          border-b-2 border-gray-200
          grid
          sm:grid-cols-5
          grid-cols-1
          gap-4
        "
      >
        <label
          class="text-sm font-medium text-gray-700 col-span-1 w-full mx-auto"
          for="announcementComment"
          >{{ $t("text.mainImage") }}</label
        >
        <div class="sm:col-span-4 col-span-5">
          <div
            class="
              grid
              gap-4
              items-center
              justify-items-center
              border-dashed border-2
              rounded-xl
              px-4
              py-2
            "
          >
            <div v-if="trade.mainimage" class="gallery relative">
              <img
                class="rounded-md"
                :src="$tools.getFileUrl(trade.mainimage)"
                @click="openLightGallery([`${trade.mainimage}`], 0, true)"
              />
              <div class="flex gap-4 justify-end">
                <div
                  type="editImage"
                  class="
                    rounded-md
                    px-4
                    py-1
                    mt-1
                    w-full
                    border-2 border-yellow-600
                    hover:bg-red-100
                    align-middle
                    text-center
                    cursor-pointer
                  "
                  @click="editMainImage(trade.mainimage)"
                >
                  <i class="bx bx-edit-alt text-2xl text-yellow-600" />
                </div>
                <div
                  class="
                    rounded-md
                    px-4
                    py-1
                    mt-1
                    w-full
                    border-2 border-red-600
                    hover:bg-red-100
                    align-middle
                    text-center
                    cursor-pointer
                  "
                  @click="deleteMainImage(trade.mainimage)"
                >
                  <i class="bx bx-trash text-2xl text-red-500" />
                </div>
              </div>
            </div>
            <div
              v-else
              class="
                cursor-pointer
                flex
                items-center
                text-sm
                font-medium
                text-gray-600
                justify-center
                rounded-md
                w-full
              "
              @click="uploadMainImage()"
            >
              <div>
                <img src="~/assets/images/image.png" class="w-12" />
                <div class="text-yellow-600">
                  {{ $t("word.download") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          py-5
          border-b-2 border-gray-200
          grid
          sm:grid-cols-5
          grid-cols-1
          gap-4
        "
      >
        <label
          class="text-sm font-medium text-gray-700 col-span-1 w-full mx-auto"
          for="announcementComment"
          >{{ $t("text.photoGallery") }}</label
        >
        <div class="sm:col-span-4 col-span-5">
          <div
            class="
              grid
              gap-4
              items-center
              justify-items-center
              border-dashed border-2
              rounded-xl
              px-4
              py-2
            "
            :class="
              trade.gallery && trade.gallery.length > 0
                ? 'lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1'
                : 'grid-cols-1'
            "
          >
            <div
              class="
                cursor-pointer
                flex
                items-center
                text-sm
                font-medium
                text-gray-600
                justify-center
                w-full
              "
              @click="uploadGalleryImage()"
            >
              <div>
                <img src="~/assets/images/image.png" class="w-12" />
                <div class="text-yellow-600">
                  {{ $t("word.download") }}
                </div>
              </div>
            </div>
            <div v-if="trade.gallery">
              <div
                v-for="(data, index) in trade.gallery"
                v-show="trade.gallery.length > 0"
                :key="index"
                class="gallery relative"
              >
                <img
                  class="rounded-md"
                  :src="$tools.getFileUrl(data)"
                  @click="openLightGallery(gallery, index, true)"
                />
                <div
                  class="
                    rounded-md
                    px-2
                    py-1
                    mt-1
                    w-full
                    border-2 border-red-600
                    hover:bg-red-100
                    align-middle
                    text-center
                    cursor-pointer
                  "
                  @click="deleteGalleryImage(data)"
                >
                  <i class="bx bx-trash text-2xl text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <light-gallery :photos="lightGalleryPhotos" :index="lightGalleryIndex" :is-open="lightGalleryIsOpen" /> -->
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
          {{ $t("word.cancel") }}
        </button>
        <button
          :class="
            $route.params.product === 'new'
              ? 'bg-green-600 border-green-600'
              : 'bg-yellow-500 border-yellow-500'
          "
          class="
            px-4
            py-2
            font-medium
            border
            rounded-md
            text-white
            hover:opacity-90
          "
          @click="onSubmit()"
        >
          {{ $t("word.announcement") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClickOutside from "vue-click-outside";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import imageEditor from "~/modals/image-editor.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import AlertError from "../../../components/AlertError.vue";
// import AxiosInit from '~/utils/axios_init'
export default {
  components: { Breadcrumbs, AlertError },
  directives: {
    ClickOutside,
  },
  mixins: [validationMixin],
  auth: false,
  data() {
    return {
      lightGalleryPhotos: [],
      isAlert: false,
      lightGalleryIndex: null,
      lightGalleryIsOpen: false,
      categories: [],
      tradingType: [],
      payment: [],
      unit: [],
      regions: [],
      isMultiselectOpened: false,
      trade: {
        tradingposttype: null,
        category: null,
        title: {
          uz: "",
          ru: "",
          en: "",
        },
        description: {
          uz: "",
          ru: "",
          en: "",
        },
        tradingpricetype: null,
        price: null,
        count: null,
        hasdelivery: null,
        deliverableregions: [],
        gallery: [],
        mainimage: null,
        unit: null,
        userid: null,
        userregion: null,
      },
      deliveryRegions: [],
      text: {
        title: "",
        description: "",
      },
      category: null,
      subcategory: null,
      subcategories: [],
      img: null,
      product_type: "",
      price_type: "",
      product_name: "",
      comment: "",
      price: "",
      total: "",
      city: "",
      district: "",
      phone: "",
      items: [
        { text: "text.tradingFloor", link: "/trading", disabled: false },
        { text: "text.myProducts", link: "/my-products", disabled: false },
        { text: "word.announcement", link: "/my-products/new", disabled: true },
      ],
      isImageChange: false,
    };
  },
  validations: {
    trade: {
      tradingposttype: { required },
      tradingpricetype: { required },
      count: { required },
      unit: { required },
      userregion: { required },
    },
    category: { required },
    subcategory: { required },
    text: {
      title: { required },
      description: { required },
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.user,
    }),
  },
  watch: {
    category() {
      if (this.category.children && this.category.children.length > 0) {
        this.subcategories = this.category.children;
      }
    },
    "text.title"() {
      if (this.text.title.length > 0) {
        this.trade.title.uz = this.text.title;
        this.trade.title.ru = this.text.title;
        this.trade.title.en = this.text.title;
      }
    },
    "text.description"() {
      if (this.text.description.length > 0) {
        this.trade.description.uz = this.text.description;
        this.trade.description.ru = this.text.description;
        this.trade.description.en = this.text.description;
      }
    },
    "trade.userregion"() {
      if (!this.trade.id && this.trade.hasdelivery) {
        const index = this.trade.deliverableregions.findIndex(
          (el) => el === this.trade.userregion
        );
        if (index < 0) {
          this.trade.deliverableregions.push(this.trade.userregion);
        }
      }
    },
  },
  mounted() {
    this.fetchDirectories().then(() => {
      this.fetchDetail();
    });
  },
  methods: {
    closeAlert() {
      this.isAlert = false;
    },
    openLightGallery(gallery, index, isOpen) {
      this.lightGalleryPhotos = gallery;
      this.lightGalleryIndex = index;
      this.lightGalleryIsOpen = isOpen;
    },
    uploadGalleryImage() {
      this.openImageEditor("4:3", null);
      this.$root.$once("image-editor-modal", (item) => {
        if (item !== "canceled") {
          this.trade.gallery.push(item.thumbnail);
        }
      });
    },
    uploadMainImage() {
      this.openImageEditor("4:3", null);
      this.$root.$once("image-editor-modal", (item) => {
        if (item !== "canceled") {
          this.trade.mainimage = item.thumbnail;
        }
      });
    },
    editMainImage(url) {
      this.openImageEditor("4:3", url);
      this.$root.$once("image-editor-modal", (item) => {
        if (item !== "canceled") {
          this.trade.mainimage = item.thumbnail;
        }
      });
    },
    openImageEditor(type, url) {
      this.$modal.show(
        imageEditor,
        { type, url },
        {
          height: "auto",
          maxWidth: 600,
          width: window.innerWidth <= 600 ? window.innerWidth - 30 : 600,
          scrollable: true,
          clickToClose: false,
        }
      );
    },
    addToSelectedRegions(item) {
      if (item.id === "all") {
        this.deliveryRegions.forEach((element) => {
          element.id;
        });
      }
      const index = this.trade.deliverableregions.findIndex(
        (el) => el.id === item.id
      );
      const regionInd = this.deliveryRegions.findIndex(
        (el) => el.id === item.id
      );
      if (index >= 0) {
        // eslint-disable-next-line no-console
        console.log("This region already selected");
        return;
      }
      this.deliveryRegions[regionInd].selected = true;
      this.trade.deliverableregions.push(item);
    },
    removeRegion(item) {
      const index = this.trade.deliverableregions.findIndex(
        (el) => el.id === item.id
      );
      const regionInd = this.deliveryRegions.findIndex(
        (el) => el.id === item.id
      );
      this.trade.deliverableregions.splice(index, 1);
      this.deliveryRegions[regionInd].selected = false;
    },
    multiselectShowHide(status) {
      if (status !== undefined) {
        this.isMultiselectOpened = status;
        return;
      }
      this.isMultiselectOpened = !this.isMultiselectOpened;
    },
    hideDropdownButton() {
      this.isMultiselectOpened = false;
    },
    deleteGalleryImage(data) {
      const index = this.trade.gallery.findIndex((el) => el === data);
      this.trade.gallery.splice(index, 1);
    },
    deleteMainImage(data) {
      this.trade.mainimage = null;
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.trade.tradingposttype.required) {
        this.$tools.focusI("posttype-1");
        return;
      }
      if (!this.$v.category.required) {
        this.$tools.focusI("category_id");
        return;
      }
      if (!this.$v.text.title.required) {
        this.$tools.focusI("title");
        return;
      }
      if (!this.$v.text.description.required) {
        this.$tools.focusI("description");
        return;
      }
      if (!this.trade.tradingpricetype) {
        this.$tools.focusI("pricetype-1");
        return;
      }
      if (this.trade.tradingpricetype.id === 1 && !this.trade.price) {
        this.$tools.focusI("price");
        return;
      }
      if (!this.$v.trade.count.required) {
        this.$tools.focusI("count");
        return;
      }
      if (!this.$v.trade.unit.required) {
        this.$tools.focusI("unit");
        return;
      }
      if (!this.$v.trade.userregion.required) {
        this.$tools.focusI("userregion");
        return;
      }
      if (
        this.trade.hasdelivery &&
        this.trade.deliverableregions.length === 0
      ) {
        this.isAlert = true;
        return;
      }
      if (!this.$v.$invalid) {
        console.log("Submitted", this.trade);
        this.trade.category =
          Object.keys(this.subcategory).length > 0
            ? this.subcategory
            : this.category;
        this.trade.userid = this.currentUser.id;
        if (!this.trade.hasdelivery) {
          this.trade.deliverableregions = [];
        }
        this.$store
          .dispatch(
            this.trade.id
              ? "crud/trading/updateTradingPost"
              : "crud/trading/postTradingPost",
            {
              data: this.trade,
            }
          )
          .then((res) => {
            if (this.trade.id) {
              this.$snotify.warning("Updated trading");
            } else {
              this.$snotify.success("Added new trading");
            }
            this.$router.push(this.localePath("/my-products"));
          })
          .catch((error) => {
            this.$snotify.error(error);
          });
      }
    },
    async fetchDetail() {
      if (this.$route.params.product !== "new") {
        await this.$store
          .dispatch("crud/trading/getTradingById", {
            id: this.$route.params.product,
          })
          .then((res) => {
            this.trade = { ...res };
            this.text.title = this.trade.title[this.$i18n.locale];
            this.text.description = this.trade.description[this.$i18n.locale];
            if (this.trade.category.parent !== null) {
              this.categories.forEach((el) => {
                if (el.id === res.category.parent) {
                  this.category = el;
                }
              });
              this.subcategory = this.trade.category;
            } else {
              this.category = this.trade.category;
            }
            this.trade.deliverableregions = res.deliverableregions.map(
              (reg) => {
                return {
                  id: reg.id,
                  name: reg.name[this.$i18n.locale],
                };
              }
            );
            this.trade.userregion = res.userregion ? res.userregion.id : null;
          });
      }
    },
    async fetchDirectories() {
      await this.$store
        .dispatch("crud/trading/type/getTradingType")
        .then((res) => {
          this.tradingType = res;
        });
      await this.$store
        .dispatch("crud/trading/price/getPriceType")
        .then((res) => {
          this.payment = res;
        });
      await this.$store
        .dispatch("crud/trading/unit/getTradingUnit")
        .then((res) => {
          this.unit = res;
        });
      await this.$store
        .dispatch("crud/trading/category/getTradingCategory")
        .then((res) => {
          this.categories = res;
        });
      await this.getRegions();
    },
    async getRegions() {
      await this.$store.dispatch("crud/region/getRegion").then((res) => {
        // this.regions = [...res];
        this.regions = res.map((region) => {
          let selected = false;
          for (let i = 0; i < this.trade.deliverableregions.length; i++) {
            if (region.id === this.trade.deliverableregions[i].id) {
              selected = true;
            }
          }
          return {
            id: region.id,
            name: region.name[this.$i18n.locale],
            selected: selected,
          };
        });
        console.log(this.regions);
        // this.deliveryRegions = [ ...this.regions ]
        // this.deliveryRegions.unshift({
        //   id: "all",
        //   name: {
        //     en: "All",
        //     ru: "Всё",
        //     uz: "Хаммаси",
        //   },
        //   selected: false,
        // });
      });
    },
  },
};
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
