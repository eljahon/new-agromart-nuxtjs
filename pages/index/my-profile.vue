<template>
  <div class="max-w-7xl mx-auto py-6 px-4 lg:px-8 pb-10">
    <div class="pb-6 flex justify-between sm:px-0 items-center">
      <breadcrumbs :items="items" />
      <!-- <div class="flex items-center md:hidden font-medium py-2 text-red-600" @click="logOut()">
        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m14.167 13.334 3.333-3.333m0 0-3.333-3.334m3.333 3.334H5.833m5 3.333v.833a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1-2.5-2.5V5.834a2.5 2.5 0 0 1 2.5-2.5h3.333a2.5 2.5 0 0 1 2.5 2.5v.833" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="ml-3">
          {{ $t('word.exit') }}
        </p>
      </div> -->
    </div>

    <div class="grid lg:grid-cols-4 grid-cols-1 lg:gap-3 gap-0 lg:space-y-0 space-y-3">
      <div>
        <div class="border rounded-md shadow-sm p-3 bg-white">
          <div class="flex">
            <img
              class="w-16 h-16 rounded-full"
              :src="
                currentUser.avatar
                  ? $tools.getFileUrl(currentUser.avatar)
                  : require('/assets/images/person/avatar.jpg')
              "
              alt="Avatar"
              @error="currentUser.avatar = require('/assets/images/person/avatar.jpg')"
            >
            <div class="block ml-3">
              <p class="text-lg text-gray-600 font-medium text-center">
                {{
                  `${currentUser.name ? currentUser.name : ''} ${
                    currentUser.surname ? currentUser.surname : ''
                  }`
                }}
              </p>
              <p class="text-green-600 font-medium text-sm">
                ID: {{ currentUser.id }}
              </p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex justify-center">
              <p
                v-if="currentUser.consultantcategories"
                class="
                  text-xs text-light-orange
                  my-2
                  px-2
                  py-1
                  font-medium
                  rounded-full
                  bg-orange-50
                "
              >
                {{ currentUser.consultantcategories[0].title[$i18n.locale] }}
              </p>
            </div>
          </div>
        </div>
        <div class="border lg:block hidden rounded-md bg-white shadow-sm mt-4 px-3">
          <router-link
            :to="{ path: localePath('/my-products') }"
            class="flex items-center font-medium border-b py-2 text-gray-600"
          >
            <i class="bx bx-clipboard text-base" />
            <p class="ml-3 text-sm">
              {{ $t('word.ads') }}
            </p>
          </router-link>
          <router-link
            :to="{ path: localePath('/chats') }"
            class="flex items-center font-medium border-b py-2 text-gray-600"
          >
            <i class="bx bx-message-rounded-dots text-base" />
            <p class="ml-3 text-sm">
              {{ $t('text.myConsultation') }}
            </p>
          </router-link>
          <router-link
            v-if="true"
            :to="{ path: localePath('/my-profile/lands') }"
            :class="
              $route.path === '/my-profile/lands' || $route.path === '/my-profile/lands/'
                ? 'text-green-600'
                : ''
            "
            class="flex items-center font-medium border-b py-2 text-gray-600"
          >
            <i class="bx bx-map-alt text-base" />
            <p class="ml-3 text-sm">
              {{ $t('word.myLands') }}
            </p>
          </router-link>
          <router-link
            v-show="false"
            :to="{ path: localePath('/my-profile/tasks') }"
            :class="
              $route.path === '/my-profile/tasks' || $route.path === '/my-profile/tasks/'
                ? 'text-green-600'
                : ''
            "
            class="flex items-center font-medium border-b py-2 text-gray-600"
          >
            <i class="bx bx-map-alt text-base" />
            <p class="ml-3 text-sm">
              {{ $t('word.tasks') }}
            </p>
          </router-link>
          <router-link
            :to="{ path: localePath('/my-profile/settings') }"
            :class="$route.path === '/my-profile/settings' ? 'text-green-600' : ''"
            class="flex items-center font-medium py-2 text-gray-600"
          >
            <i class="bx bx-cog text-base" />
            <p class="ml-3 text-sm">
              {{ $t('word.settings') }}
            </p>
          </router-link>
          <div class="flex items-center font-medium py-2 mt-3 text-red-600" @click="logOut()">
            <i class="bx bx-log-out text-base" />
            <p class="ml-3 text-sm">
              {{ $t('word.exit') }}
            </p>
          </div>
        </div>
        <my-profile-swiper class="lg:hidden flex" />
      </div>
      <main class="col-span-3">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyProfileSwiper from '~/components/main/my-profile-swiper.vue'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
export default {
  name: 'MyProfile',
  components: {
    Breadcrumbs,
    MyProfileSwiper
  },
  data () {
    return {
      img: null,
      items: [{ text: 'text.myProfile', link: '/my-profile', disabled: true }]
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.user
    })
  },
  methods: {
    async logOut () {
      await localStorage.removeItem('local')
      await localStorage.removeItem('user_info')
      await this.$auth.logout()
    },
    getBase64 (img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    changeImage (e) {
      const file = e.target.files[0]
      this.getBase64(file, (img) => {
        this.img = img
      })
    }
  }
}
</script>
