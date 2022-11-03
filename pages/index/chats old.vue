<template>
  <div class="max-w-7xl mx-auto md:py-6 py-4 sm:px-6 lg:px-8 pb-10">
    <div class="px-4 md:py-6 py-0 flex justify-between sm:px-0 items-center">
      <breadcrumbs :items="items" />
    </div>
    <div v-if="windowWidth >= 768" class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4" style="height: calc(100vh - 65px)">
      <div class="md:col-span-1 xl:col-span-1 col-span-1 border shadow-md p-3 rounded-md">
        <div class="my-2 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill:rgba(156, 163, 175, 1);transform:;-ms-filter:"><path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z" /></svg>
          </div>
          <input type="text" name="search" class="text-gray-400 text-sm bg-gray-100 block w-full pl-10 sm:text-sm border-gray-50 rounded-md" placeholder="Suhbatdoshingizni qidiring">
        </div>
        <div class="mt-2">
          <select id="location" name="location" class="mt-1 block w-3/4 text-gray-700 pr-10 py-2 border-transparent focus:outline-none text-sm rounded-md">
            <option selected>
              Barcha konsultatsiyalar
            </option>
            <option>
              Faol
            </option>
            <option>Tugallangan</option>
          </select>
        </div>
        <div v-for="(consultant, index) in consultants" :key="index" class="border-b pb-2 cursor-pointer" @click="toChatting(chat)">
          <div class="mt-4 flex items-center pb-2">
            <div class="flex-shrink-0">
              <span class="inline-block relative">
                <img class="h-10 w-10 rounded-full" :src="consultant.avatar" alt="">
                <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400" />
              </span>
            </div>
            <div class="flex items-center overflow-y-auto scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2 scrolling-touch">
              <div class="grid grid-cols-3 ml-3">
                <div class="col-span-2 block mb-1">
                  <p class="text-sm  text-gray-600">
                    {{ `${consultant.author.first_name} ${consultant.author.last_name}` }}
                  </p>
                  <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                    <!-- {{ chat.message }} -->
                  </div>
                </div>
                <div class="flex justify-end">
                  <p class="text-xs  text-gray-400">
                    {{ chat.time }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p class="text-green-800 bg-green-50 text-xs px-2 ml-12 py-1 text-center rounded-xl w-14">
            {{ chat.status }}
          </p>
        </div>
      </div>
      <div class="md:col-span-2 xl:col-span-3">
        <router-view />
      </div>
    </div>
    <div v-else class="m-4 ">
      <div v-if="$route.path == '/chats' || $route.path == '/chats/'" class="p-4 border rounded-md shadow-md bg-white">
        <div class="md:col-span-1 xl:col-span-1 col-span-1">
          <div class="my-2 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill:rgba(156, 163, 175, 1);transform:;-ms-filter:"><path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z" /></svg>
            </div>
            <input type="text" name="search" class="text-gray-400 text-sm bg-gray-100 block w-full pl-10 sm:text-sm border-gray-50 rounded-md" placeholder="Suhbatdoshingizni qidiring">
          </div>
          <div class="mt-2 font-medium flex items-center">
            <select id="location" name="location" class="mt-1 block text-gray-700 py-2 border-transparent focus:outline-none text-sm rounded-md">
              <option selected>
                Barcha konsultatsiyalar
              </option>
              <option>
                Faol
              </option>
              <option>Tugallangan</option>
            </select>
          </div>
          <div v-for="(chat, index) in chats" :key="index" class="border-b pb-2 cursor-pointer" @click="toChatting(chat)">
            <div class="mt-4 grid grid-cols-7 pb-2">
              <div class="flex-shrink-0">
                <span class="inline-block relative">
                  <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                  <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400" />
                </span>
              </div>
              <div class="flex items-center col-span-5 overflow-y-auto scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2 scrolling-touch">
                <div class="grid grid-cols-5 ml-3">
                  <div class="col-span-4 block mb-1">
                    <p class="text-sm  text-gray-600">
                      {{ chat.name }}
                    </p>
                    <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                      {{ chat.message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end">
                <p class="text-xs  text-gray-400">
                  {{ chat.time }}
                </p>
              </div>
            </div>
            <p class="text-green-800 bg-green-50 text-xs px-2 ml-12 py-1 text-center rounded-xl w-14">
              {{ chat.status }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
export default {
  name: 'Chat',
  auth: false,
  components: {
    Breadcrumbs
  },
  data () {
    return {
      consultants: [],
      chats: [
        { id: 1, img: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', name: 'Guljahon Juraeva', message: 'Sizning bu muammoingiz', status: 'Faol', time: '9:12' },
        { id: 2, img: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', name: 'Sabina Juraeva', message: 'Sizning bu muammoingiz', status: 'Faol', time: 'kecha' },
        { id: 3, img: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', name: 'Rayhon Juraeva', message: 'Sizning bu muammoingiz', status: 'Faol', time: '10/06/2021' },
        { id: 4, img: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', name: 'Guli Juraeva', message: 'Sizning bu muammoingiz', status: 'Faol', time: '10/06/2021' },
        { id: 5, img: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', name: 'Sevara Juraeva', message: 'Sizning bu muammoingiz', status: 'Faol', time: '10/06/2021' },
        { id: 6, img: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', name: 'Jumagul Juraeva', message: 'Sizning bu muammoingiz', status: 'Faol', time: '10/06/2021' }
      ],
      items: [
        { text: 'Onlayn konsultatsiya ', link: '/consultancy', disabled: true }
      ],
      windowWidth: 0
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.user
    })
  },
  mounted () {
    this.setWindowWidth()
    this.fetchUser()
  },
  created () {},
  methods: {
    setWindowWidth () {
      this.windowWidth = window.innerWidth
    },
    toChatting (consultant) {
      this.$router.push(this.localePath(`/chats/${consultant.id}`))
    },
    fetchUser () {
      const user = this.$auth.$state.user
      this.$store.dispatch('user/getUserById', user).then((res) => {
        // console.log(res)
      })
    }
  }
}
</script>

<style>
  .scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;

  }

  .scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
  }

  .scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
  }

  .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
  }
 </style>
