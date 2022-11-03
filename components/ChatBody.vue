<template>
  <div
    v-if="!loading"
    class="overflow-hidden grid grid-cols-1 gap-4 xl:grid-cols-6"
  >
    <div class="xl:col-span-4 border rounded-md shadow-md col-span-1">
      <div
        style="height: calc(72vh - 0px)"
        class="flex-1 p-2 justify-between flex flex-col"
      >
        <div
          class="flex sm:items-center justify-between pb-3 pt-0 border-b-2 border-gray-200"
        >
          <div class="relative flex items-center space-x-4">
            <div class="relative">
              <img
                :src="
                  consultant && consultant.avatar
                    ? $tools.getFileUrl(consultant.avatar)
                    : require('/assets/images/person/avatar.jpg')
                "
                @error="
                  consultant.avatar = require('/assets/images/person/avatar.jpg')
                "
                alt=""
                class="w-8 sm:w-12 h-8 sm:h-12 rounded-full"
              />
            </div>
            <div class="flex flex-col leading-tight">
              <div class="text-lg mt-1 flex items-center">
                <span class="text-gray-700 mr-3">{{
                  `${consultant.name ? consultant.name : ''} ${consultant.surname ? consultant.surname : ''}`
                }}</span>
              </div>
              <span
                v-if="consultant.consultantcategory"
                class="text-sm text-gray-600"
                >{{ consultant.consultantcategory.title[$i18n.locale] }}</span
              >
            </div>
          </div>
        </div>
        <div
          id="messages"
          class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="chat-message"
          >
            <div
              v-if="
                message.senderID
                  ? message.senderID.id == currentUser.id
                    ? true
                    : false
                  : false
              "
              class="flex items-end justify-end"
            >
              <div
                class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
                @click.prevent.stop="handleClick($event, message)"
              >
                <div
                  class="px-4 py-2 rounded-lg inline-block rounded-br-none text-gray-600 text-sm bg-green-100"
                >
                  <div class="bg-indigo-300 mb-1">
                    <img
                      v-if="message.filePath"
                      class="object-cover h-48 w-96"
                      :src="`${$tools.getFileUrl(message.filePath)}`"
                    />
                  </div>
                  <span class="">{{ message.text }}</span>
                </div>
              </div>
              <img
                :src="
                  message.senderID && message.senderID.avatar
                    ? $tools.getFileUrl(message.senderID.avatar)
                    : require('/assets/images/person/avatar.jpg')
                "
                @error="require('/assets/images/person/avatar.jpg')"
                alt="My profile"
                class="w-6 h-6 rounded-full order-2"
              />
            </div>
            <div v-else class="flex items-end">
              <div
                class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
              >
                <div class="px-4 py-2 rounded-lg inline-block rounded-bl-none text-gray-600 bg-orange-50">
                  <div class="bg-indigo-300 mb-1">
                    <img
                      v-if="message.filePath"
                      class="object-cover h-48 w-96"
                      :src="`${$tools.getFileUrl(message.filePath)}`"
                    />
                  </div>
                  <span>{{ message.text }}</span>
                </div>
              </div>
              <img
                :src="
                  message.senderID && message.senderID.avatar
                    ? $tools.getFileUrl(message.senderID.avatar)
                    : require('/assets/images/person/avatar.jpg')
                "
                @error="require('/assets/images/person/avatar.jpg')"
                alt="My profile"
                class="w-6 h-6 rounded-full order-1"
              />
            </div>
          </div>
          <div class="chat-message"></div>
        </div>
        <div
          v-if="
            !currentRoom.isCompleted ||
            $route.query.room_id === 'new'
          "
          class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
        >
          <div class="relative flex">
            <textarea
              v-model="message.text"
              :rows="1"
              :placeholder="$t('text.writeYourMessage')"
              class="w-full focus:outline-none focus:border-green-300 pr-20 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3"
              @keyup.enter="sendMessage()"
            />
            <div class="absolute right-0 items-center inset-y-0 flex">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                @click="$refs.file.click()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-6 w-6 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
                <input
                  ref="file"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="mediaChange"
                />
              </button>
              <button
                type="button"
                class="text-blue-400 hover:bg-blue-300 hover:text-blue-600 inline-flex items-center mr-1 justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out focus:outline-none"
                @click="sendMessage()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-else-if="currentRoom.rate0to5 === null" class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div class="flex items-center justify-between">
            <div>{{ $t('text.evaluateTheAdvice') }}</div>
            <div class="flex ml-4 items-center">
              <star-rating v-model="advice.rating" />
            </div>
            <div class="items-center flex">
              <button
                type="button"
                class="text-green-400 bg-green-100 hover:bg-geen-300 px-2 py-1 hover:text-green-600 inline-flex items-center mr-1 justify-center rounded-md transition duration-500 ease-in-out focus:outline-none"
                @click="toRating()"
              >
                {{ $t('word.rating') }}
              </button>
            </div>
          </div>
        </div>
        <div v-else class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div class="align-middle text-center">
            <span
              v-if="state === 'consultant'"
              class="rounded-md py-1 px-2 bg-green-200 text-gray-600"
            >
              {{ $t("text.chatRoomClosed") }}
            </span>
            <span
              v-if="state === 'trading'"
              class="rounded-md py-1 px-2 bg-green-200 text-gray-600"
            >
              {{ $t("text.chatRoomClosed") }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="state === 'consultant'"
      class="responsive lg:block hidden overflow-y-auto scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2 scrolling-touch lg:col-span-2 h-full col-span-1 flex-col min-w-0 flex-1"
    >
      <div class="flex-1 bg-white relative">
        <div class="border rounded-md shadow-md pb-2">
          <div class="flex justify-center my-3">
            <div>
              <img
                :src="
                  consultant && consultant.avatar
                    ? $tools.getFileUrl(consultant.avatar)
                    : require('/assets/images/person/avatar.jpg')
                "
                @error="
                  consultant.avatar = require('/assets/images/person/avatar.jpg')
                "
                class="w-16 h-16 rounded-full"
              />
            </div>
          </div>
          <div class="text-center self-center">
            <p class="text-lg text-gray-600 text-center">
              {{ consultant.name }}
            </p>
            <div class="flex justify-center">
              <p
                v-if="consultant.category"
                class="text-xs text-green-600 my-2 px-2 py-1 font-medium rounded-full bg-green-50"
              >
                {{ consultant.category.title[$i18n.locale] }}
              </p>
            </div>
            <div class="flex justify-center">
              <p class="text-gray-500 text-sm">
                <span class="text-base text-gray-600 font-medium">4.7</span>
                (256 ta baholash)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative bg-white z-0 mt-3">
        <div class="border rounded-md shadow-md p-3">
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="(video, index) in videos"
              :key="index"
              class="flex my-3"
            >
              <iframe
                :src="video.url"
                frameborder="0"
                allowfullscreen
                class=""
              />
            </div>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-600 text-sm font-semibold">
              {{ $t("text.usefulInformation") }}
            </p>
            <!-- <p class="text-green-600 text-sm font-normal">
              Barchasi
            </p> -->
          </div>
          <div class="grid grid-cols-1">
            <div
              v-for="(info, index) in usefulInfos"
              :key="index"
              class="border-b py-2 cursor-pointer"
            >
              <router-link
                :to="{
                  path: localePath(`/useful-information/${info.id}`),
                  query: { id: info.id },
                }"
                class="text-blue-600 text-sm line-clamp-1"
              >
                {{ info.title[$i18n.locale] }}
              </router-link>
            </div>
          </div>
          <div class="flex justify-between mt-3">
            <p class="text-gray-600 text-sm font-semibold">Fayllar</p>
            <p class="text-green-600 text-sm font-normal">Barchasi</p>
          </div>
          <div class="grid grid-cols-5 mt-3 items-center">
            <div class="bg-blue-600 w-9 h-9 rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M4 4c0-1.105.895-2 2-2h4.586c.53 0 1.039.21 1.414.586L15.414 6c.375.375.586.884.586 1.414V16c0 1.105-.895 2-2 2H6c-1.105 0-2-.895-2-2V4zm2 6c0-.552.448-1 1-1h6c.552 0 1 .448 1 1s-.448 1-1 1H7c-.552 0-1-.448-1-1zm1 3c-.552 0-1 .448-1 1s.448 1 1 1h6c.552 0 1-.448 1-1s-.448-1-1-1H7z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="block col-span-3">
              <p class="text-gray-500 text-sm">Chorvachilikdagi holat</p>
              <p class="text-gray-400 text-xs">
                docx <span class="ml-2">1.8 Mb</span>
              </p>
            </div>
            <div class="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#0EA5E9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h5.586c.265 0 .52.105.707.293l5.414 5.414c.188.188.293.442.293.707V19c0 1.105-.895 2-2 2z"
                />
              </svg>
            </div>
          </div>
          <div class="grid grid-cols-5 mt-3 items-center">
            <div class="bg-yellow-500 w-9 h-9 rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M4 4c0-1.105.895-2 2-2h4.586c.53 0 1.039.21 1.414.586L15.414 6c.375.375.586.884.586 1.414V16c0 1.105-.895 2-2 2H6c-1.105 0-2-.895-2-2V4zm2 6c0-.552.448-1 1-1h6c.552 0 1 .448 1 1s-.448 1-1 1H7c-.552 0-1-.448-1-1zm1 3c-.552 0-1 .448-1 1s.448 1 1 1h6c.552 0 1-.448 1-1s-.448-1-1-1H7z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="block col-span-3">
              <p class="text-gray-500 text-sm">Chorvani parvarishi</p>
              <p class="text-gray-400 text-xs">
                pdf <span class="ml-2">5.3 Mb</span>
              </p>
            </div>
            <div class="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#6B7280"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-simple-context-menu
      ref="vueSimpleContextMenu"
      element-id="myUniqueId"
      :options="options"
      @option-clicked="optionClicked"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable require-await */
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import VueSimpleContextMenu from "vue-simple-context-menu";
import ratingModal from "~/modals/rating.vue";
import deleteModal from "~/modals/delete.vue";
import sendMedia from "~/modals/send-media.vue";
import { socket } from "~/plugins/socket.client.js";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
export default {
  auth: true,
  components: {
    VueSimpleContextMenu,
  },
  props: {
    state: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chatMessage: "",
      advice: {
        rating: 0,
        comment: ''
      },
      message: {
        roomID: null,
        senderID: null,
        receiverID: null,
        text: "",
        filePath: null,
        activityID: null,
        seen: false,
      },
      isChatMessageEditable: false,
      videos: {},
      isMenu: false,
      windowWidth: 0,
      right: null,
      currentUser: {
        id: null,
      },
      consultant: {},
      product: {},
      loading: true,
      currentRoom: {},
      usefulInfos: [],
      options: [
        {
          name: "Edit",
          slug: "edit",
        },
        {
          name: "<em>Delete</em>",
          slug: "delete",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      finishedChatId: (state) => state.socket.finishedChatId,
    }),
    ...mapGetters({
      messages: "socket/getMessages",
    }),
  },
  watch: {
    "$route.query.room_id"(val) {
      this.currentUser = JSON.parse(localStorage.getItem("user_info"));
      this.socketDisconnector().then(() => {
        this.fetchData().then(() => {
          this.fetchCurrentRoom().then(() => {
            // if (
            //   this.currentRoom.isCompleted === true &&
            //   this.currentRoom.rate0to5 === null
            // ) {
            //   this.showRatingModal();
            // }
            this.loading = false;
            this.message = {
              roomID: this.currentRoom.id,
              senderID: this.currentUser.id,
              receiverID:
                this.state === "consultant"
                  ? this.consultant.id
                  : this.product.userid.id,
              text: "",
              filePath: null,
              activityID: null,
              seen: false,
            };
          });
        });
      });
    },
    finishedChatId() {
      if (parseInt(this.finishedChatId) === this.currentRoom.id) {
        this.socketDisconnector().then(() => {
          this.fetchData().then(() => {
            this.fetchCurrentRoom().then(() => {
              // if (
              //   this.currentRoom.isCompleted === true &&
              //   this.currentRoom.rate0to5 === null
              // ) {
              //   this.showRatingModal();
              // }
            });
          });
        });
      }
    },
  },
  created() {
    if (!process.client) {
      return;
    }
    this.currentUser = JSON.parse(localStorage.getItem("user_info"));
  },
  beforeMount() {},
  mounted() {
    this.fetchData().then(() => {
      this.fetchCurrentRoom().then(() => {
        // if (
        //   this.currentRoom.isCompleted === true &&
        //   this.currentRoom.rate0to5 === null
        // ) {
        //   this.showRatingModal();
        // }
        this.setWindowWidth();
        this.loading = false;
        this.message = {
          roomID: this.currentRoom.id,
          senderID: this.currentUser.id,
          receiverID:
            this.state === "consultant"
              ? this.consultant.id
              : this.product.userid.id,
          text: "",
          filePath: null,
          activityID: null,
          seen: false,
        };
      });
    });
  },
  beforeDestroy() {
    this.socketDisconnector();
  },
  methods: {
    mediaChange({ target }) {
      const formData = new FormData();
      // formData.append("name", `image-${target.files[0].size}.jpg`);
      formData.append("files", target.files[0]);
      this.$store.dispatch("upload/uploadFile", formData).then((res) => {
        this.$modal.show(
          sendMedia,
          {
            image: res.data[0].url
              ? this.$tools.cropUrl(res.data[0].url)
              : null,
          },
          {
            height: "auto",
            maxWidth: 600,
            width: window.innerWidth <= 600 ? window.innerWidth - 30 : 600,
            scrollable: true,
            clickToClose: false,
          }
        );
        this.$root.$once("send-media-modal", (item) => {
          if (item !== "canceled") {
            this.message.filePath = item.image;
            this.message.text = item.text;
            this.sendMessage();
          }
        });
      });
    },
    uploaderType(data) {
      this.$store.dispatch("upload/uploadFile", data).then((res) => {
        this.$store.dispatch("upload/uploadingAction", {
          show: false,
          percent: 0,
        });
        this.onClose({
          large:
            res.formats && res[0].formats.large
              ? this.$tools.cropUrl(res[0].formats.large.url)
              : null,
          medium:
            res.formats && res[0].formats.medium
              ? this.$tools.cropUrl(res[0].formats.medium.url)
              : null,
          small:
            res.formats && res[0].formats.small
              ? this.$tools.cropUrl(res[0].formats.small.url)
              : null,
          thumbnail:
            res.formats && res[0].formats.thumbnail
              ? this.$tools.cropUrl(res[0].formats.thumbnail.url)
              : null,
          url: res[0].url ? this.$tools.cropUrl(res[0].url) : null,
        });
      });
    },
    handleClick(event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
    },

    optionClicked(event) {
      if (event.option.slug === "edit") {
        const _message = event.item;
        this.message = {
          roomID: _message.roomID.id,
          senderID: _message.senderID.id,
          receiverID: _message.receiverID.id,
          text: _message.text,
          filePath: _message.filePath,
          activityID: _message.activityID,
          seen: _message.seen,
          id: _message.id,
        };
      } else if (event.option.slug === "delete") {
        this.$modal.show(
          deleteModal,
          { name: "DeleteMessage" },
          {
            height: "auto",
            maxWidth: 400,
            width: window.innerWidth <= 400 ? window.innerWidth - 30 : 400,
            scrollable: true,
            clickToClose: false,
          }
        );
        this.$root.$once("delete-modal", (item) => {
          if (item !== "canceled") {
            socket.emit(
              "deleteMessage",
              { id: event.item.id, roomID: event.item.roomID.id },
              ({ res, rej }) => {}
            );
          }
        });
      }
    },
    downloadFile(url) {
      window.open(url, "_blank");
    },
    previewChatFile() {
      const input = this.$refs.chatfile.files[0];
      const type = this.$refs.chatfile.files[0].type;
      if (input === undefined) {
        return;
      }
      const formData = new FormData();
      formData.append("file", input);
      this.$store.dispatch("media/postMedia", formData).then((res) => {
        Window.store = this.$store;
        if (process.env.NODE === "test") {
          Vue.prototype.$snotify.warning(
            `Message: ${
              type.search("image") === 0 ? "chat_image" : "chat_file"
            }`
          );
        } else {
          console.log(
            `Message: ${
              type.search("image") === 0 ? "chat_image" : "chat_file"
            }`
          );
        }
      });
    },
    async socketDisconnector() {
      await socket.emit("leave", {
        username: this.currentUser.username,
        room: this.$route.query.room_id,
      });
      await this.$store.dispatch("socket/clearMessages");
      console.log(`${this.consultant.username} leaved`);
    },
    async toRating () {
      let _currentRoom = {
        chatroomtype: this.currentRoom.chatroomtype,
        consultantID: this.currentRoom.consultantID.id,
        id: this.currentRoom.id,
        isCompleted: this.currentRoom.isCompleted,
        istradingchat: this.currentRoom.istradingchat,
        title: this.currentRoom.title,
        userID: this.currentRoom.userID.id,
        rate0to5: this.advice.rating,
        comment: this.advice.comment
      }
      await this.$store
        .dispatch('crud/chats/room/updateRooms', {
          id: _currentRoom.id,
          data: { ..._currentRoom }
        })
        .then((res) => {
          this.fetchCurrentRoom()
        })
        .catch((error) => {
          this.$snotify.error(error.response.data.detail)
        })
    },
    sendMessage() {
      if (this.message.text === 0 || this.message.text.trim().length === 0) {
        return;
      }
      if (this.$route.query.room_id === "new") {
        this.$store
          .dispatch("crud/chats/room/postRooms", {
            data: {
              consultantID: this.consultant.id,
              userID: this.currentUser.id,
              isCompleted: false,
            },
          })
          .then(async (res) => {
            this.currentRoom = res;
            this.message.roomID = res.id;
            await this.$store.dispatch("socket/createRoom", res);
            await this.$bridge.$emit("selected_room", { room_id: res.id });
            await this.sendMessageToSocket({ ...this.message });
            await this.$router.push({
              path: this.localePath("/chats"),
              query: { room_id: res.id, consultant_id: this.consultant.id },
            });
          });
      } else {
        this.sendMessageToSocket({ ...this.message });
      }
    },
    sendMessageToSocket(message) {
      console.log("New message: ", message);
      if (message.id) {
        const _id = message.id;
        const data = { ...message };
        delete data.id;
        const _message = {
          id: _id,
          data,
        };
        socket.emit("editMessage", _message, ({ res, rej }) => {
          this.setMessage();
        });
      } else {
        socket.emit("sendMessage", message, ({ res, rej }) => {
          this.setMessage();
        });
      }
    },
    setMessage() {
      if (
        this.currentRoom.unread_message &&
        this.currentRoom.unread_message !== 0
      ) {
        this.$store
          .dispatch("crud/static/get", {
            url: "/seen_messages",
            query: {
              "_where[0][roomID.id]": this.$route.query.room_id,
              "_where[0][receiverID.id]": this.currentUser.id,
            },
          })
          .then(() => {
            this.$store.dispatch("socket/seenMessage", this.message);
            this.fetchCurrentRoom();
          });
      }
      this.message = {
        roomID: this.currentRoom.id,
        senderID: this.currentUser.id,
        receiverID:
          this.state === "consultant"
            ? this.consultant.id
            : this.product.userid.id,
        text: "",
        filePath: null,
        activityID: null,
        seen: false,
      };
    },
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    async fetchCurrentRoom() {
      if (this.$route.query.room_id !== "new") {
        await this.$store
          .dispatch("crud/chats/room/getRoomsById", {
            id: this.$route.query.room_id,
          })
          .then((res) => {
            this.currentRoom = res;
          });
      }
    },
    showRatingModal(data) {
      this.$modal.show(
        ratingModal,
        { currentRoom: this.currentRoom },
        {
          height: "auto",
          maxWidth: 500,
          width: window.innerWidth <= 450 ? window.innerWidth - 10 : 450,
          acrollable: true,
        }
      );
    },
    async fetchData() {
      if (this.state === "consultant") {
        await this.$store
          .dispatch("crud/user/getUsersById", {
            id: this.$route.query.consultant_id,
          })
          .then((res) => {
            this.consultant = res;
          });
        await this.$store
          .dispatch("crud/usefulInfo/getUsefulInformation", {
            locale: this.$i18n.locale,
            query: {
              _sort: "created_at:DESC",
              "_where[0][consultantid.id]": this.consultant.id,
              _limit: 3,
              _start: 1,
            },
          })
          .then((res) => {
            this.usefulInfos = res;
          });
      }
      if (this.state === "trading") {
        await this.$store
          .dispatch("crud/trading/getTradingById", {
            id: this.$route.query.product_id,
          })
          .then((res) => {
            this.product = res;
          });
      }
    },
    showMenu() {
      this.isMenu = !this.isMenu;
    },
  },
};
</script>

<style scoped>
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
@media screen and (min-width: 370px) {
  .responsive {
    height: calc(60vh - 0rem);
  }
}
@media screen and (min-width: 320px) {
  .responsive {
    height: calc(73vh - 25px);
  }
}
@media screen and (min-width: 400px) {
  .responsive {
    height: calc(69vh - 0rem);
  }
}
@media screen and (min-width: 768px) {
  .responsive {
    height: calc(72vh - 0rem);
  }
}
@media screen and (min-width: 1024px) {
  .responsive {
    height: calc(72vh - 0rem);
  }
}

@media screen and (min-width: 370px) {
  .chat-responsive {
    height: calc(49vh - 0rem);
  }
}
@media screen and (min-width: 320px) {
  .chat-responsive {
    height: calc(46vh - 25px);
  }
}
@media screen and (min-width: 400px) {
  .chat-responsive {
    height: calc(48vh - 0rem);
  }
}
@media screen and (min-width: 768px) {
  .chat-responsive {
    height: calc(52vh - 0rem);
  }
}
@media screen and (min-width: 1024px) {
  .chat-responsive {
    height: calc(51vh - 0rem);
  }
}
@media screen and (min-width: 1440px) {
  .chat-responsive {
    height: calc(49vh - 0rem);
  }
}
</style>
