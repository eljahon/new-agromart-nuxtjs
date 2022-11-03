<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div class="px-4 my-4 flex justify-between sm:px-0 items-center">
      <breadcrumbs :items="items" />
    </div>
    <div
      style="height: calc(72vh - 0px)"
      class="
        responsive
        overflow-y-auto
        scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
        scrolling-touch
        responsive
        flex flex-col
        min-w-0
        flex-1
        overflow-hidden
      "
    >
      <div
        v-if="windowWidth >= 768"
        class="grid xl:grid-cols-4 md:grid-cols-3 h-auto grid-cols-1 gap-4"
      >
        <div
          style="height: calc(72vh - 0px)"
          class="
            md:m-0
            m-4
            bg-white
            responsive
            overflow-y-auto
            scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
            scrolling-touch
            md:col-span-1
            xl:col-span-1
            col-span-1
            border
            shadow-md
            rounded-md
          "
        >
          <div class="m-3 relative rounded-md">
            <div class="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style="fill: rgba(156, 163, 175, 1); transform: ; -ms-filter: "
              >
                <path
                  d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              class="
                text-gray-400 text-sm
                bg-gray-100
                block
                border-transparent
                w-full
                pl-10
                sm:text-sm
                rounded-md
              "
              :placeholder="$t('text.searchInterlocutor')"
            >
          </div>
          <div class="flex items-center m-3">
            <div>
              <button
                :class="[
                  activetab === 'active'
                    ? 'border-b border-green-600 text-green-600'
                    : 'hover:text-green-600 text-gray-600',
                ]"
                class="text-base font-medium text-gray-500 focus:outline-none"
                @click="changeTab('active')"
              >
                {{ $t('word.active') }}
              </button>
            </div>

            <div>
              <button
                :class="[
                  activetab === 'closed'
                    ? 'border-b border-green-600 text-green-600'
                    : 'hover:text-green-600  text-gray-600',
                ]"
                class="text-base font-medium text-gray-500 ml-6 focus:outline-none"
                @click="changeTab('closed')"
              >
                {{ $t('word.finished') }}
              </button>
            </div>
          </div>
          <div v-if="activetab === 'active'">
            <div v-if="activeRooms.length > 0">
              <div
                v-for="(room, index) in activeRooms"
                :key="index"
                class="border-b hover:bg-gray-100 cursor-pointer"
                :class="$route.query.room_id === `${room.id}` ? 'bg-green-50' : 'bg-white'"
                @click="toChatting(room)"
              >
                <div class="p-4 flex items-center">
                  <div class="flex-shrink-0">
                    <span class="inline-block relative">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="room.consultantID && room.consultantID.avatar ? $tools.getFileUrl(room.consultantID.avatar) : require('/assets/images/person/avatar.jpg')"
                        alt=""
                      >
                    </span>
                  </div>
                  <div
                    class="
                      flex
                      items-center
                      overflow-y-auto
                      scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
                      scrolling-touch
                    "
                  >
                    <div class="grid grid-cols-3 ml-3">
                      <div class="col-span-2 block mb-1">
                        <p v-if="room.consultant !== null" class="text-sm text-gray-600">
                          {{ `${room.consultantID.name ? room.consultantID.name : ''} ${room.consultantID.surname ? room.consultantID.surname : ''}` }}
                        </p>
                        <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                          {{ room.message }}
                        </div>
                      </div>
                      <div v-if="room.unread_message !== 0" class="flex justify-end">
                        <p class="text-xs text-gray-100 bg-gray-400 rounded-xl py-2 px-3">
                          <!-- {{ $tools.getDateTime(room.updated_at) }} -->
                          {{ room.unread_message }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="align-middle text-center">
                <span class="rounded-md py-1 px-2 bg-green-200 text-gray-600">
                  {{ $t('text.youDontHaveActiveRooms') }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="activetab === 'closed'">
            <div v-if="closedRooms.length > 0">
              <div
                v-for="(room, index) in closedRooms"
                :key="index"
                class="border-b hover:bg-gray-100 cursor-pointer"
                :class="$route.query.room_id === `${room.id}` ? 'bg-green-100' : 'bg-white'"
                @click="toChatting(room)"
              >
                <div class="p-4 flex items-center">
                  <div class="flex-shrink-0">
                    <span class="inline-block relative">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="room.consultantID && room.consultantID.avatar ? $tools.getFileUrl(room.consultantID.avatar) : require('/assets/images/person/avatar.jpg')"
                        alt=""
                      >
                    </span>
                  </div>
                  <div
                    class="
                      flex
                      items-center
                      overflow-y-auto
                      scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
                      scrolling-touch
                    "
                  >
                    <div class="grid grid-cols-3 ml-3">
                      <div class="col-span-2 block mb-1">
                        <p v-if="room.consultant !== null" class="text-sm text-gray-600">
                          {{ `${room.consultantID.name ? room.consultantID.name : ''} ${room.consultantID.surname ? room.consultantID.surname : ''}` }}
                        </p>
                        <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                          {{ room.message }}
                        </div>
                      </div>
                      <div class="flex justify-end">
                        <p class="text-xs text-gray-400">
                          {{ $tools.getDateTime(room.updated_at) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="ml-2">
              <div class="align-middle text-center">
                <span class="rounded-md py-1 px-2 bg-red-200 text-gray-600">
                  {{ $t('text.youDontHaveClosedRooms') }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="Object.keys($route.query).length === 0" class="md:col-span-2 xl:col-span-3">
          <div class="align-middle text-center">
            <span class="rounded-md py-1 px-2 bg-green-200 text-gray-600">
              {{ $t('text.selectConsultantToMessaging') }}
            </span>
          </div>
        </div>
        <div v-else class="md:col-span-2 xl:col-span-3">
          <chat-body :state="'consultant'" />
        </div>
      </div>
      <div v-else class="m-4">
        <div
          v-if="Object.keys($route.query).length === 0 && windowWidth < 768"
          class="p-4 border rounded-md shadow-md bg-white"
        >
          <div class="md:col-span-1 xl:col-span-1 col-span-1">
            <div class="my-2 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style="fill: rgba(156, 163, 175, 1); transform: ; -ms-filter: "
                >
                  <path
                    d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                class="
                  text-gray-400 text-sm
                  bg-gray-100
                  block
                  w-full
                  pl-10
                  sm:text-sm
                  border-gray-50
                  rounded-md
                "
                :placeholder="$t('text.searchInterlocutor')"
              >
            </div>
            <div class="flex items-center m-3">
              <div>
                <button
                  :class="[
                    activetab === 'active'
                      ? 'border-b border-green-600 text-green-600'
                      : 'hover:text-green-600 text-gray-600',
                  ]"
                  class="text-base font-medium text-gray-500 focus:outline-none"
                  @click="changeTab('active')"
                >
                  Faol
                </button>
              </div>

              <div>
                <button
                  :class="[
                    activetab === 'closed'
                      ? 'border-b border-green-600 text-green-600'
                      : 'hover:text-green-600  text-gray-600',
                  ]"
                  class="text-base font-medium text-gray-500 ml-6 focus:outline-none"
                  @click="changeTab('closed')"
                >
                  Tugallangan
                </button>
              </div>
            </div>
            <div v-if="activetab === 'active'">
              <div
                v-for="(room, index) in activeRooms"
                :key="index"
                class="border-b hover:bg-gray-100 cursor-pointer"
                :class="$route.query.room_id === `${room.id}` ? 'bg-green-100' : 'bg-white'"
                @click="toChatting(room)"
              >
                <div class="p-4 flex items-center">
                  <div class="flex-shrink-0">
                    <span class="inline-block relative">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="room.consultantID && room.consultantID.avatar ? $tools.getFileUrl(room.consultantID.avatar) : require('/assets/images/person/avatar.jpg')"
                        alt=""
                      >
                    </span>
                  </div>
                  <div
                    class="
                      flex
                      items-center
                      overflow-y-auto
                      scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
                      scrolling-touch
                    "
                  >
                    <div class="grid grid-cols-3 ml-3">
                      <div class="col-span-2 block mb-1">
                        <p v-if="room.consultant !== null" class="text-sm text-gray-600">
                          {{ `${room.consultantID.name ? room.consultantID.name : ''} ${room.consultantID.surname ? room.consultantID.surname : ''}` }}
                        </p>
                        <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                          {{ room.message }}
                        </div>
                      </div>
                      <div class="flex justify-end">
                        <p class="text-xs text-gray-400">
                          {{ $tools.getDateTime(room.updated_at) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <p class="text-green-800 bg-green-50 text-xs px-2 ml-12 py-1 text-center rounded-xl w-14">
              {{ room.isOnline }}
            </p> -->
              </div>
            </div>
            <div v-if="activetab === 'closed'">
              <div
                v-for="(room, index) in closedRooms"
                :key="index"
                class="border-b hover:bg-gray-100 cursor-pointer"
                :class="$route.params.index === `${room.id}` ? 'bg-green-50' : 'bg-white'"
                @click="toChatting(room)"
              >
                <div class="p-4 flex items-center">
                  <div class="flex-shrink-0">
                    <span class="inline-block relative">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="room.consultantID && room.consultantID.avatar ? $tools.getFileUrl(room.consultantID.avatar) : require('/assets/images/person/avatar.jpg')"
                        alt=""
                      >
                    </span>
                  </div>
                  <div
                    class="
                      flex
                      items-center
                      overflow-y-auto
                      scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
                      scrolling-touch
                    "
                  >
                    <div class="grid grid-cols-3 ml-3">
                      <div class="col-span-2 block mb-1">
                        <p v-if="room.consultant !== null" class="text-sm text-gray-600">
                          {{ `${room.consultantID.name ? room.consultantID.name : ''} ${room.consultantID.surname ? room.consultantID.surname : ''}` }}
                        </p>
                        <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                          {{ room.message }}
                        </div>
                      </div>
                      <div class="flex justify-end">
                        <p class="text-xs text-gray-400">
                          {{ $tools.getDateTime(room.updated_at) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <chat-body :state="'consultant'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
import { socket } from "~/plugins/socket.client.js";
export default {
  name: 'Chat',
  auth: true,
  components: {
    Breadcrumbs
  },
  data () {
    return {
      items: [{ text: 'text.onlineConsultation', link: '/online-consultation', disabled: true }],
      windowWidth: 0,
      activeRooms: [],
      closedRooms: [],
      currentUser: {},
      noChatSelected: true,
      activetab: 'active'
    }
  },
  computed: {
    ...mapState({
      finishedChatId: state => state.socket.finishedChatId,
      createRoom: state => state.socket.createRoom,
      seenMessage: state => state.socket.seenMessage
    })
  },
  watch: {
    finishedChatId () {
      this.fetchActiveRooms()
    },
    createRoom () {
      this.fetchActiveRooms()
    },
    seenMessage () {
      this.fetchActiveRooms()
    }
  },
  created () {
    if (!process.client) {
      return
    }
    this.currentUser = JSON.parse(localStorage.getItem('user_info'))
    if (Object.keys(this.currentUser).length > 0) {
      this.fetchActiveRooms()
    }
    if (this.$route.query.room_id && this.$route.query.room_id !== 'new') {
      this.socketDisconnector().then(() => {
        this.$bridge.$emit('selected_room', { room_id: this.$route.query.room_id })
      })
    }
  },
  mounted () {
    this.scrollToEnd()
    this.setWindowWidth()
  },
  updated () {
    this.scrollToEnd()
  },
  methods: {
    async socketDisconnector() {
      await socket.emit("leave", {
        username: this.currentUser.username,
        room: this.$route.query.room_id,
      });
      await this.$store.dispatch("socket/clearMessages");
    },
    scrollToEnd () {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        }
      }, 0)
    },
    changeTab (status) {
      this.activetab = status
      if (status === 'active') {
        this.fetchActiveRooms()
        return
      }
      this.fetchClosedRooms()
    },
    setWindowWidth () {
      this.windowWidth = window.innerWidth
    },
    toChatting (data) {
      this.noChatSelected = false
      this.$bridge.$emit('selected_room', { room_id: data.id })
      this.$router.push({ query: { room_id: data.id, consultant_id: data.consultantID.id } })
    },
    setRooms(data, status) {
      if (status === 'active') {
        data.forEach(element => {
          if (element.isCompleted === false || (element.isCompleted && element.unread_message > 0 && element.rate0to5 === null)) {
            this.activeRooms.push(element)
          }
        });
      } else {
        data.forEach(element => {
          if (element.isCompleted && element.unread_message === 0) {
            this.closedRooms.push(element)
          }
        });
      }
    },
    async fetchActiveRooms () {
      await this.$store
        .dispatch('crud/chats/room/getRooms', {
          _sort: 'updated_at:DESC',
          '_where[0][userID.id]': this.currentUser.id,
          // '_where[_or][0][unread_message_gt]': 0,
          // '_where[_or][1][isCompleted]': false,
        })
        .then((res) => {
          this.activeRooms = []
          this.setRooms(res, 'active')
          // this.activeRooms = res
        })
    },
    async fetchClosedRooms () {
      await this.$store
        .dispatch('crud/chats/room/getRooms', {
          _sort: 'updated_at:DESC',
          '_where[0][isCompleted]': true,
          '_where[0][userID.id]': this.currentUser.id
        })
        .then((res) => {
          this.closedRooms = []
          this.setRooms(res, 'closed')
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
@media screen and (max-width: 1024px) {
  .responsive {
    height: calc(100vh - 25px);
  }
}
@media screen and (min-width: 375px) {
  .responsive {
    height: calc(78vh - 25px);
  }
}
@media screen and (min-width: 375px) {
  .responsive {
    height: calc(80vh - 25px);
  }
}
</style>
