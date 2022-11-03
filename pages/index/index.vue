<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 lg:py-6 py-0 sm:px-0">
      <div class="grid grid-cols-3 gap-4">
        <div class="lg:col-span-2 col-span-3">
          <!-- Consultation -->

          <div v-if="consultation.length > 0">
            <router-link
              :to="localePath('/online-consultation')"
              class="text-2xl leading-8 font-medium text-gray-600"
            >
              {{ $t("word.consultants") }}
            </router-link>

            <div class="mt-3 mb-6 gap-3 relative col-span-2 lg:col-span-3">
              <consultants-swiper :consultation="consultation" />
            </div>
          </div>

          <!-- Trading floor for desktop -->
          <router-link
            :to="localePath('/trading')"
            class="md:flex hidden text-gray-600 font-medium text-2xl"
          >
            {{ $t("text.tradingFloor") }}
          </router-link>
          <div v-if="products.length > 0" class="h-auto md:flex hidden">
            <div class="grid grid-cols-4 gap-2">
              <div
                v-for="(product, index) in products"
                :key="index"
                class="relative bg-white shadow-sm hover:shadow-md rounded-md p-2 xl:mt-3 mt-4 lg:h-56 xl:h-72"
              >
                <nuxt-link
                  :to="{
                    path: localePath(`/trading/${product.id}`),
                    query: { id: product.id },
                  }"
                  class=""
                >
                  <!-- :to="{ path: localePath(`/trading/${product.id}`), query: { id: product.id } }" -->
                  <img
                    v-if="product.mainimage || product.thumbnail"
                    :src="
                      $tools.getFileUrl(
                        product.thumbnail
                          ? product.thumbnail
                          : product.mainimage
                      )
                    "
                    class="w-full lg:h-32 xl:h-44 object-cover rounded-sm"
                  />
                  <img
                    v-else-if="product.gallery.length > 0"
                    :src="$tools.getFileUrl(product.gallery)"
                    class="w-full lg:h-32 xl:h-44 object-cover rounded-sm"
                  />
                  <img
                    v-else
                    class="w-full lg:h-32 xl:h-44 object-cover rounded-sm"
                    src="https://www.pinupacc.com/images/dummy.png"
                  />
                  <div class="">
                    <p
                      class="text-gray-600 text-xs xl:line-clamp-2 lg:line-clamp-1 mt-2"
                    >
                      {{ product.title[$i18n.locale] }}
                    </p>
                    <div class="absolute bottom-2 inset-x-2">
                      <div class="flex justify-between items-center pb-1">
                        <p
                          v-if="product.pricetype === 'contract'"
                          class="text-green-800 lg:text-xs xl:text-sm font-medium text-center w-auto"
                        >
                          {{ $t("text.byAgreement") }}
                        </p>

                        <p
                          v-else-if="
                            product.type === '1' ||
                            product.pricetype === 'exact'
                          "
                          class="text-green-600 w-auto rounded-xl font-semibold xl:text-base lg:text-sm text-right"
                        >
                          {{ product.price }}
                        </p>
                        <p
                          v-else
                          class="text-light-orange w-auto rounded-xl font-semibold xl:text-base lg:text-sm text-right"
                        >
                          {{ product.price }}
                        </p>
                        <div class="flex items-center">
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
                          <span class="ml-1 text-xs text-gray-400">{{
                            product.seen
                          }}</span>
                        </div>
                      </div>

                      <div class="flex justify-between">
                        <div
                          v-if="product.pricetype !== 'contract'"
                          class="text-gray-500 lowercase text-xs"
                        >
                          {{ $t("word.sum") }}
                          <span v-if="product.unit"
                            >/ {{ product.unit.namejson[$i18n.locale] }}</span
                          >
                        </div>
                        <div v-if="product.typename">
                          <p
                            v-if="product.type === '1'"
                            class="text-green-800 font-medium bg-green-100 text-xs px-1.5 py-0.5 text-center rounded-xl w-auto"
                          >
                            {{ product.typename[$i18n.locale] }}
                          </p>
                          <p
                            v-else
                            class="text-light-orange bg-orange-100 w-auto rounded-xl py-0.5 px-1.5 font-medium text-xs"
                          >
                            {{ product.typename[$i18n.locale] }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>

          <!-- Trading floor for mobile -->
          <div
            v-if="products.length > 0"
            :class="consultation.length === 0 ? 'mt-0' : 'lg:mt-8 mt-0'"
            class="block md:hidden col-span-1 h-auto"
          >
            <router-link
              :to="localePath('/trading')"
              class="text-gray-600 font-medium text-2xl"
            >
              {{ $t("text.tradingFloor") }}
            </router-link>
            <div class="mt-3 mb-6 gap-3 relative col-span-2 lg:col-span-3">
              <trading-swiper :products="products" />
            </div>
          </div>

          <!-- Prices for mobile -->
          <div
            v-if="prices.length > 0"
            :class="consultation.length === 0 ? 'mt-0' : 'lg:mt-8 mt-0'"
            class="block md:hidden col-span-1 h-auto"
          >
            <router-link
              :to="localePath('/prices')"
              class="text-gray-600 font-medium text-2xl"
            >
              {{ $t("text.prices") }}
            </router-link>
            <div class="mt-3 mb-6 gap-3 relative col-span-2 lg:col-span-3">
              <prices-swiper :prices="prices" />
            </div>
          </div>
        </div>

        <!-- News for Desktop -->
        <div>
          <div class="lg:col-span-1 lg:grid hidden">
            <router-link :to="localePath('/news')" class="text-gray-600 font-medium text-2xl">
              {{ $t("word.news") }}
            </router-link>
            <img class="relative w-full object-cover rounded-md rounded-b-none mt-3" src="../../assets/images/banner-2.jpg" alt="Banner image">
            <div v-if="news.length > 0" class="block mt-3">
              <nuxt-link
                :to="{
                  path: localePath(`/news/${news[0].id}`),
                  query: { id: news[0].id },
                }"
              >
                <div class="relative cursor-pointer">
                  <div class="">
<!--                    <img-->
<!--                      :src="-->
<!--                        news.length > 0 && news-->
<!--                          ? $tools.getFileUrl(-->
<!--                              news[0].thumbnail-->
<!--                                ? news[0].thumbnail-->
<!--                                : news[0].mainphoto-->
<!--                            )-->
<!--                          : 'https://www.pinupacc.com/images/dummy.png'-->
<!--                      "-->
<!--                      class="relative w-full xl:h-56 lg:h-36 object-cover rounded-md rounded-b-none"-->
<!--                    />-->
<!--                    <img class="relative w-full object-cover rounded-md rounded-b-none" src="../../assets/images/banner-2.jpg" alt="Banner image">-->
                  </div>
                  <div
                    class="absolute flex text-xs text-light-orange bg-orange-50 bottom-2 p-1 w-32 justify-center right-2 rounded-md"
                  >
                    {{ $tools.getDate(news[0].created_at) }}
                  </div>
                </div>
<!--                <div-->
<!--                  class="p-2 bg-white rounded-md rounded-t-none shadow-sm hover:shadow-md"-->
<!--                >-->
<!--                  <h3 class="text-gray-600 col-span-2 text-sm">-->
<!--                    {{ news[0].title[$i18n.locale] }}-->
<!--                  </h3>-->
<!--                  <p class="text-xs mt-2 col-span-3 line-clamp-3 text-gray-400">-->
<!--                    {{ news[0].description[$i18n.locale] }}-->
<!--                  </p>-->
<!--                </div>-->
              </nuxt-link>
              <div v-if="news.length > 1" class="items-center">
                <div
                  v-for="(item, index) in news.length <= 4 && news.length >= 2
                    ? news.slice(1, news.length)
                    : news.slice(1, 5)"
                  :key="index"
                  class="flex lg:space-y-1 xl:space-y-2 border border-transparent bg-white rounded-md shadow-sm hover:shadow-md mt-2.5 p-2"
                >
                  <nuxt-link
                    :to="{
                      path: localePath(`/news/${item.id}`),
                      query: { id: item.id },
                    }"
                    class="grid lg:grid-cols-4 md:grid-cols-6 grid-cols-4 md:gap-4 gap-8"
                  >
                    <div class="w-20 h-20">
                      <img
                        class="w-20 h-20 object-cover rounded-md"
                        :src="
                          $tools.getFileUrl(
                            item.thumbnail ? item.thumbnail : item.mainphoto
                          )
                        "
                      />
                    </div>

                    <div
                      class="lg:col-span-3 md:col-span-5 col-span-3 flex flex-col content-start"
                    >
                      <p
                        class="text-xs font-medium text-gray-600 line-clamp-2 content-center"
                      >
                        {{ item.title[$i18n.locale] }}
                      </p>

                      <div
                        class="flex text-xs mt-6 text-light-orange bg-orange-50 p-1 w-32 justify-center rounded-md"
                      >
                        <time datetime="2020-03-10">
                          {{ $tools.getDate(item.created_at) }}
                        </time>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- News for Mobile -->

        <div
          v-if="news.length > 0"
          :class="consultation.length === 0 ? 'mt-0' : 'lg:mt-8 mt-0'"
          class="block lg:hidden col-span-3 h-auto"
        >
          <p class="text-gray-600 font-medium text-2xl">
            {{ $t("word.news") }}
          </p>
          <div class="mt-3 mb-6 gap-3 relative col-span-2 lg:col-span-3">
            <news-swiper :news="news" />
          </div>
        </div>

        <!-- Prices for desktop -->
        <div
          v-if="prices.length > 0"
          :class="consultation.length === 0 ? 'mt-0' : 'lg:mt-3 mt-0'"
          class="md:block hidden col-span-3 h-auto"
        >
          <router-link :to="localePath('/prices')" class="text-gray-600 font-medium text-2xl">
            {{ $t("text.prices") }}
          </router-link>
          <div class="pt-3 gap-3 relative">
            <prices-swiper :prices="prices" />
          </div>
        </div>
        <!-- Useful Information -->

        <div
          v-if="information.length > 0"
          :class="consultation.length === 0 ? 'mt-0' : 'lg:mt-3 mt-0'"
          class="col-span-3 h-auto"
        >
          <router-link
            :to="localePath('/useful-information')"
            class="text-gray-600 font-medium text-2xl"
          >
            {{ $t("text.usefulInformation") }}
          </router-link>
          <div class="mt-3 gap-3 relative col-span-2 lg:col-span-3">
            <useful-information-swiper :information="information" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConsultantsSwiper from "~/components/main/consultants-swiper.vue";
import NewsSwiper from "~/components/main/news-swiper.vue";
import PricesSwiper from "~/components/main/prices-swiper.vue";
import TradingSwiper from "~/components/main/trading-swiper.vue";
import UsefulInformationSwiper from "~/components/main/useful-information-swiper.vue";
export default {
  auth: false,
  components: {
    ConsultantsSwiper,
    PricesSwiper,
    TradingSwiper,
    NewsSwiper,
    UsefulInformationSwiper,
  },
  data() {
    return {
      consultation: [],
      products: [],
      news: [],
      information: [],
      prices: [],
    };
  },
  mounted() {
    this.fetchHomePage();
  },
  methods: {
    async fetchHomePage() {
      await this.$store
        .dispatch("crud/user/getUsers", {
          "_where[0][role.id]": 3,
          "_where[0][blocked]": false,
        })
        .then((res) => {
          this.consultation = res;
        });
      await this.$store
        .dispatch("crud/trading/getTradingPost", {
          _limit: 4,
          _sort: "created_at:DESC",
          "_where[0][isblocked]": false,
        })
        .then((res) => {
          this.products = res;
        });
      await this.$store
        .dispatch("crud/news/getNews", {
          locale: this.$i18n.locale,
          query: {
            _start: 0,
            _limit: 4,
            _sort: "created_at:DESC"
          },
        })
        .then((res) => {
          this.news = res;
        });
      await this.$store
        .dispatch("crud/usefulInfo/getUsefulInformation", {
          locale: this.$i18n.locale,
          query: {
            _start: 0,
            _limit: 15,
            _sort: "created_at:DESC",
          },
        })
        .then((res) => {
          this.information = res;
        });
      await this.$store
        .dispatch("crud/price/getPrice", {
          "_where[0][islast]": true,
          "_where[0][avg_gt]": 0,
          _limit: 15,
        })
        .then((res) => {
          this.prices = res;
        });
    },
  },
};
</script>
