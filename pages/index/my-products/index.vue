<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 pb-6 md:flex block justify-between sm:px-0">
<!--      <breadcrumbs :items="items" />-->
      <div class="flex md:justify-end justify-between md:mt-0 mt-5">
        <button
          type="button"
          class="
            justify-center
            md:w-auto
            w-full
            md:mr-4
            mr-0
            inline-flex
            items-center
            px-4
            py-2
            border border-gray-300
            shadow-md
            text-base
            font-medium
            rounded-md
            text-gray-700
            bg-white
            focus:outline-none
          "
          @click="$router.push(localePath('/trading'))"
        >
          {{ $t("text.allAds") }}
        </button>
        <button
          type="button"
          class="
            hidden
            md:inline-flex
            items-center
            px-4
            py-2
            border border-transparent
            shadow-sm
            text-base
            font-medium
            rounded-md
            text-white
            bg-green-600
            focus:outline-none
          "
          @click="$router.push(localePath('/my-products/new'))"
        >
          {{ $t("word.announcement") }} <span class="ml-2">+</span>
        </button>
      </div>
      <div class="md:hidden flex mt-5">
        <filter-swiper />
      </div>
    </div>
    <div class="md:grid hidden grid-cols-2 mb-4 md:px-0 px-4">
      <div class="flex items-center relative">
        <input
          class="
            w-full
            pl-9
            text-base
            font-medium
            text-gray-500
            border-gray-300
            rounded-md
          "
          :placeholder="$t('word.search')"
          type="text"
        />
        <div class="absolute m-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="none"
            viewBox="0 0 27 24"
          >
            <path
              stroke="#6b7280"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M23.059 21l-6.334-6m2.111-5c0 3.866-3.308 7-7.388 7-4.081 0-7.39-3.134-7.39-7s3.309-7 7.39-7c4.08 0 7.388 3.134 7.388 7z"
            />
          </svg>
        </div>
      </div>
      <div class="flex relative items-center justify-end">
        <div
          class="
            flex
            items-center
            hover:bg-gray-100
            p-2
            rounded-md
            cursor-pointer
          "
          @click="openSort"
        >
          <div class="text-lg text-gray-700 mr-2">
            {{ $t("word.sell") }}
          </div>
          <svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.833 13.333v-10m0 0L2.5 6.666m3.333-3.333 3.334 3.333m5 0v10m0 0 3.333-3.333m-3.333 3.333-3.334-3.333"
              stroke="#374151"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          v-show="isSortOpened"
          class="
            z-20
            absolute
            top-12
            right-10
            p-4
            w-40
            text-lg
            rounded-md
            shadow-lg
            py-1
            text-gray-700
            bg-white
            ring-1 ring-black ring-opacity-5
            focus:outline-none
          "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabindex="-1"
        >
          <div class="flex items-center gap-2">
            <input type="radio" name="sorting" class="w-3 h-3" />
            <span>Sotib olish</span>
          </div>
          <div class="flex items-center gap-2">
            <input type="radio" name="sorting" class="w-3 h-3" />
            <span>Hamyonbop</span>
          </div>
          <div class="flex items-center gap-2">
            <input type="radio" name="sorting" class="w-3 h-3" />
            <span>Eng yaqin</span>
          </div>
        </div>
        <div class="ml-3">
          <button
            aria-expanded="false"
            aria-haspopup="true"
            class="
              bg-gray-100
              hover:bg-gray-200
              rounded-md
              w-10
              h-10
              focus:outline-none
            "
            @click="openFilter"
          >
            <div class="text-lg">
              <i class="flex justify-center items-center bx bx-slider-alt" />
            </div>
          </button>
        </div>
        <div
          v-show="isFilterOpened"
          class="
            z-20
            absolute
            top-12
            p-4
            w-80
            rounded-md
            shadow-lg
            border
            py-1
            bg-white
            ring-1 ring-black ring-opacity-5
            focus:outline-none
          "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabindex="-1"
        >
          <div class="text-gray-600 font-semibold pb-4 text-xl">
            {{ $t("word.filter") }}
          </div>
          <div class="text-gray-700 text-sm font-medium pb-3">
            {{ $t("text.adType") }}
          </div>
          <select
            class="
              form-select
              text-sm
              w-full
              border
              text-gray-900
              py-2
              mb-1
              border-gray-300
              rounded-md
              focus:outline-none focus:border-gray-300
              transition-colors
              cursor-pointer
            "
          >
            <option value="">Sotish</option>
            <option value="">Sotib olish</option>
          </select>
          <div class="text-gray-700 text-sm font-medium py-3">
            {{ $t("word.category") }}
          </div>
          <select
            class="
              form-select
              text-sm
              w-full
              border
              text-gray-900
              py-2
              mb-1
              border-gray-300
              rounded-md
              focus:outline-none focus:border-gray-300
              transition-colors
              cursor-pointer
            "
          >
            <option value="">Parranda</option>
            <option value="">Qoramol</option>
          </select>
          <select
            class="
              form-select
              text-sm
              w-full
              border
              text-gray-500
              py-2
              my-2
              border-gray-300
              rounded-md
              focus:outline-none focus:border-gray-300
              transition-colors
              cursor-pointer
            "
          >
            <option value="man">Quyi kategoriya</option>
            <option value="woman">Sotib olish</option>
          </select>
          <div class="text-gray-700 text-sm font-medium py-3">
            {{ $t("word.price") }}
          </div>
          <input
            type="text"
            name="initial_price"
            :placeholder="$t('text.fromSum')"
            class="w-full text-sm rounded-md border-gray-300"
          />
          <input
            type="text"
            name="final_price"
            :placeholder="$t('text.toSum')"
            class="my-3 w-full text-sm rounded-md border-gray-300"
          />
          <div class="text-gray-700 text-sm font-medium py-3">
            {{ $t("text.deliveryParam") }}
          </div>
          <div class="block gap-3">
            <div class="flex items-center">
              <input id="pick_up" class="rounded" checked type="checkbox" />
              <div class="">
                <label class="text-sm font-medium text-gray-700 ml-2">{{
                  $t("text.pickUp")
                }}</label>
              </div>
            </div>
            <div class="flex items-center my-3">
              <input id="delivery" class="rounded" type="checkbox" />
              <div class="">
                <label class="text-sm font-medium text-gray-700 ml-2">{{
                  $t("word.delivery")
                }}</label>
              </div>
            </div>
            <button
              class="
                text-sm text-white
                font-medium
                bg-green-600
                p-2
                rounded-md
                w-full
              "
            >
              {{ $t("word.show") }}
            </button>
            <button
              class="
                text-sm text-light-orange
                font-medium
                bg-orange-50
                p-2
                my-3
                rounded-md
                w-full
              "
            >
              {{ $t("text.cleanFilter") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        grid
        lg:grid-cols-4
        md:grid-cols-3
        sm:grid-cols-2
        grid-cols-1
        md:px-0
        px-4
        gap-3
      "
    >
      <div v-for="(item, index) in myProduct" :key="index">
        <div class="col-span-3 flex gap-4 h-auto w-full mx-auto cursor-pointer">
          <div
            class="gap-x-2 rounded-md border hover:shadow-lg shadow-md w-full"
          >
            <div class="h-48 relative object-cover overflow-hidden">
              <router-link :to="{ path: localePath('/my-products') }">
                <img
                  v-if="item.mainimage || item.thumbnail"
                  :src="
                    $tools.getFileUrl(
                      item.thumbnail ? item.thumbnail : item.mainimage
                    )
                  "
                  class="
                    w-full
                    md:h-60
                    h-44
                    object-cover
                    rounded-md rounded-b-none
                  "
                />
                <img
                  v-else-if="item.gallery"
                  :src="$tools.getFileUrl(item.gallery[0])"
                  class="
                    w-full
                    md:h-60
                    h-44
                    object-cover
                    rounded-md rounded-b-none
                  "
                />
                <img
                  v-else
                  class="
                    w-full
                    md:h-60
                    h-44
                    object-cover
                    rounded-md rounded-b-none
                  "
                  src="https://www.pinupacc.com/images/dummy.png"
                />
              </router-link>
              <div v-if="item.type">
                <p
                  v-if="item.type === '1'"
                  class="
                    text-green-800
                    bg-green-50
                    text-xs
                    px-2
                    py-1
                    text-center
                    rounded-xl
                    w-16
                    absolute
                    bottom-2
                    left-2
                  "
                >
                  {{ item.typename[$i18n.locale] }}
                </p>
                <p
                  v-else
                  class="
                    text-light-orange
                    bg-orange-50
                    text-xs
                    px-2
                    py-1
                    text-center
                    rounded-xl
                    w-20
                    absolute
                    bottom-2
                    left-2
                  "
                >
                  {{ item.typename[$i18n.locale] }}
                </p>
              </div>
              <p
                class="
                  text-gray-600
                  bg-gray-100
                  text-sm
                  px-3
                  font-medium
                  rounded-md rounded-t-none rounded-br-none
                  py-1
                  text-center
                  rounded-bl
                  absolute
                  top-0
                  right-0
                "
              >
                ID: {{ item.id }}
              </p>
            </div>
            <div class="p-3">
              <h3 class="text-gray-600 line-clamp-1 font-medium text-base">
                {{ item.title[$i18n.locale] }}
              </h3>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center gap-2">
                  <p
                    v-if="item.pricetype === 'contract'"
                    class="text-green-600 font-medium text-lg"
                  >
                    {{ $t("text.byAgreement") }}
                  </p>
                  <p
                    v-else-if="item.type === '1'"
                    class="text-green-600 font-medium text-lg"
                  >
                    {{ item.price }}
                  </p>
                  <p v-else class="text-light-orange font-medium text-lg">
                    {{ item.price }}
                  </p>
                  <p
                    v-if="item.pricetype !== 'contract'"
                    class="text-gray-500 flex items-center lowercase text-sm"
                  >
                    {{ $t("word.sum") }}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <path
                      stroke="#9CA3AF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 6c0 .828-.672 1.5-1.5 1.5-.829 0-1.5-.672-1.5-1.5S5.17 4.5 6 4.5c.828 0 1.5.672 1.5 1.5z"
                    />
                    <path
                      stroke="#9CA3AF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M1.229 6C1.866 3.971 3.761 2.5 6 2.5s4.134 1.471 4.771 3.5c-.637 2.029-2.532 3.5-4.77 3.5-2.24 0-4.135-1.471-4.772-3.5z"
                    />
                  </svg>
                  <span class="text-xs text-gray-500">{{ item.seen }}</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 mx-3 mb-3">
              <button
                class="
                  p-1
                  flex
                  text-gray-500
                  justify-center
                  items-center
                  rounded-md
                  border-2 border-gray-300
                "
                @click="changeProduct(item)"
              >
                <i class="bx bx-edit" />
                <span class="ml-2">{{ $t("word.change") }}</span>
              </button>
              <button
                class="
                  p-1
                  flex
                  bg-yellow-500
                  text-gray-500
                  justify-center
                  items-center
                  rounded-md
                "
              >
                <p
                  class="
                    text-gray-500
                    bg-white
                    py-1
                    px-2
                    font-medium
                    text-xs
                    mr-2
                    rounded-full
                  "
                >
                  3
                </p>
                <span class="text-white">{{ $t("word.messages") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination
      v-if="pagination.pageCount > 1"
      :current-page="parseInt($route.query.offset)"
      :page-count="pagination.pageCount"
      @callback="pageChanged($event)"
    />
  </div>
</template>

<script>
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import FilterSwiper from "~/components/main/filter-swiper.vue";
export default {
  auth: true,
  components: { Breadcrumbs, FilterSwiper },
  data() {
    return {
      isFilterOpened: false,
      isSortOpened: false,
      items: [
        { text: "text.tradingFloor", link: "/trading", disabled: false },
        { text: "text.myAds", link: "/my-products", disabled: true },
      ],
      myProduct: [],
      query: {
        limit: 12,
        offset: 1,
      },
      currentUser: {},
    };
  },
  computed: {
    pagination() {
      return this.$store.state.crud.trading.pagination;
    },
  },
  watch: {
    "$route.query.offset"() {
      if (this.$route.query.offset) {
        this.fetchDetail(this.$route.query);
      }
    },
    "$route.query.category_id"() {
      if (this.$route.query.category_id) {
        this.fetchDetail(this.$route.query);
      }
    },
  },
  created() {
    if (!process.client) {
      return;
    }
    this.currentUser = JSON.parse(localStorage.getItem("user_info"));
  },
  mounted() {
    this.fetchDetail(
      Object.keys(this.$route.query).length > 0
        ? {
            category_id: this.$route.query.category_id,
            limit: this.$route.query.limit,
            offset: this.$route.query.offset,
          }
        : {
            category_id: "all",
            limit: this.pagination.limit,
            offset: this.pagination.page,
          }
    );
  },
  methods: {
    openFilter() {
      this.isFilterOpened = !this.isFilterOpened;
    },
    openSort() {
      this.isSortOpened = !this.isSortOpened;
    },
    pageChanged(offset) {
      this.$router.push({
        path: this.localePath(this.$route.query.path),
        query: this.setQuery(this.$route.query, offset),
      });
    },
    setQuery(query, offset) {
      if (query.category_id) {
        return {
          category_id: query.category_id,
          limit: query.limit ? query.limit : this.pagination.limit,
          offset,
        };
      }
      return {
        limit: query.limit ? query.limit : this.pagination.limit,
        offset,
      };
    },
    changeProduct(data) {
      this.$router.push({
        path: this.localePath(`/my-products/${data.id}`),
      });
    },
    // eslint-disable-next-line require-await
    async fetchDetail(query) {
      this.$store
        .dispatch("crud/trading/getTradingPost", {
          "_where[0][userid.id]": this.currentUser.id,
          "_where[0][isblocked]": false,
          _sort: "created_at:DESC",
          _limit: query.limit,
          _start: (query.offset - 1) * query.limit,
          // user_id: user.id
        })
        .then((res) => {
          this.pageCount =
            res.count % 12 > 0
              ? Math.trunc(res.count / 12) + 1
              : res.count / 12;
          this.myProduct = res;
        });
    },
  },
};
</script>
