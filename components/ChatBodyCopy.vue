<template>
  <div
    v-if="!loading"
    class="overflow-hidden grid grid-cols-1 gap-4 xl:grid-cols-6"
  >
    <div
      class="responsive flex xl:col-span-4 border rounded-md shadow-md col-span-1 flex-col min-w-0 flex-1 overflow-hidden"
    >
      <div class="flex-1 relative p-5 bg-white">
        <div class="flex pb-3 mb-2 space-x-3">
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <router-link
                  v-if="windowWidth < 768"
                  :to="{ path: localePath('/chats') }"
                >
                  <i class="bx bx-arrow-back text-xl text-gray-600" />
                </router-link>
                <div
                  v-if="state === 'consultant'"
                  class="text-lg flex items-center font-medium text-gray-600"
                >
                  {{
                    `${consultant.name ? consultant.name : ""} ${
                      consultant.surname ? consultant.surname : ""
                    }`
                  }}
                </div>
                <div
                  v-if="state === 'trading'"
                  class="text-lg flex items-center font-medium text-gray-600"
                >
                  {{ `${product.title[$i18n.locale]}` }}
                </div>
              </div>
            </div>
            <div
              ref="chat"
              class="chat-responsive chat overflow-y-auto mt-4 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2 scrolling-touch"
            >
              <div
                v-for="(mes, index) in messages"
                :key="index"
                class="mb-2 flex flex-col"
              >
                <div
                  v-if="
                    mes.senderID
                      ? mes.senderID.id == currentUser.id
                        ? true
                        : false
                      : false
                  "
                  class="mx-2 flex justify-end"
                >
                  <div
                    class="block text-gray-600 text-sm bg-green-100 p-2 rounded-md rounded-br-none"
                  >
                    <div class="bg-indigo-300 mb-1">
                      <img
                        v-if="mes.filePath"
                        class="object-cover h-48 w-96"
                        :src="`${$tools.getFileUrl(mes.filePath)}`"
                      />
                    </div>
                    <div>
                      {{ mes.text }}
                    </div>
                  </div>
                </div>
                <div v-else class="flex justify-start w-auto">
                  <div v-if="mes.type === 'chat_file'" />
                  <div
                    class="block text-gray-600 text-sm bg-orange-50 p-2 rounded-md rounded-bl-none"
                  >
                    <div class="bg-indigo-300 mb-1">
                      <img
                        v-if="mes.filePath"
                        class="object-cover h-48 w-96"
                        :src="`${$tools.getFileUrl(mes.filePath)}`"
                      />
                    </div>
                    {{ mes.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          currentRoom.isCompleted === false || $route.query.room_id === 'new'
        "
        class="relative px-5 pb-5 bg-white z-0"
      >
        <div class="w-full mb-3 h-12">
          <div class="bottom-0 right-0 left-0 text-gray-400">
            <div
              class="flex bg-gray-100 rounded-md items-center px-4 mb-2 py-1"
            >
              <div class="flex mt-2 items-center" @click="openMediaModal">
                <label for="chatFile">
                  <div
                    class="text-2xl -mt-1 ml-2 cursor-pointer text-gray-500 hover:text-blue-400"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m12.644 5.833-5.489 5.489a1.667 1.667 0 1 0 2.357 2.357l5.346-5.489a3.333 3.333 0 0 0-4.714-4.714L4.798 8.964a5 5 0 1 0 7.072 7.071l5.214-5.202"
                        stroke="#4B5563"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </label>
              </div>
              <div class="flex-grow">
                <div class="px-4 py-2 w-full">
                  <div class="text-gray-600 focus-within:text-gray-800">
                    <textarea
                      v-model="message.text"
                      :rows="1"
                      type="message"
                      class="w-full py-3 text-sm rounded-full pl-5 focus:outline-none"
                      :placeholder="$t('text.enterRequest')"
                      autocomplete="off"
                      @keyup.enter="sendMessage()"
                    />
                  </div>
                </div>
              </div>
              <div class="flex-none text-right mt-2" @click="sendMessage()">
                <i
                  class="text-2xl bx bx-send -mt-1 cursor-pointer text-blue-400 hover:text-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="relative px-5 pb-5 bg-white z-0">
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
                class="w-16 h-16 rounded-full"
                @error="
                  consultant.avatar = require('/assets/images/person/avatar.jpg')
                "
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
            if (
              this.currentRoom.isCompleted === true &&
              this.currentRoom.rate0to5 === null
            ) {
              this.showRatingModal();
            }
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
              if (
                this.currentRoom.isCompleted === true &&
                this.currentRoom.rate0to5 === null
              ) {
                this.showRatingModal();
              }
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
        if (
          this.currentRoom.isCompleted === true &&
          this.currentRoom.rate0to5 === null
        ) {
          this.showRatingModal();
        }
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
    sendMediaMessage({ target }) {
      console.log(target);
      // const formData = new FormData();
      // formData.append("file", target.files[0]);

      // this.channel.sendMessage(formData);
      // target.value = "";
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
      if (process.env.NODE === "test") {
        this.$snotify.error(`${this.consultant.username} leaved`);
      } else {
        console.log(`${this.consultant.username} leaved`);
      }
    },
    sendMessage() {
      if (this.message.text === 0) {
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
          .then((res) => {
            this.currentRoom = res;
            this.$store.dispatch("socket/createRoom", res);
            this.$bridge.$emit("selected_room", { room_id: res.id });
            this.$router.push({
              path: this.localePath("/chats"),
              query: { room_id: res.id, consultant_id: this.consultant.id },
            });
            this.sendMessageToSocket();
          });
      } else {
        this.sendMessageToSocket();
      }
    },
    sendMessageToSocket() {
      if (this.message.id) {
        const _id = this.message.id;
        const data = { ...this.message };
        delete data.id;
        const _message = {
          id: _id,
          data,
        };
        socket.emit("editMessage", _message, ({ res, rej }) => {
          this.setMessage();
        });
      } else {
        socket.emit("sendMessage", this.message, ({ res, rej }) => {
          this.setMessage();
        });
      }
    },
    setMessage() {
      if (this.currentRoom.unread_message !== 0) {
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
      this.message.text = "";
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
    openMediaModal() {
      this.$modal.show(
        sendMedia,
        { name: "SendMedia" },
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
          const _message = {
            roomID: parseInt(this.$route.query.room_id),
            senderID: this.currentUser.id,
            receiverID: this.consultant.id,
            text: item.text,
            filePath: item.image.url,
            activityID: null,
            seen: false,
          };
          socket.emit("sendMessage", _message, ({ res, rej }) => {
            if (res) {
              this.chatMessage = "";
            } else {
              console.error(rej);
            }
          });
        }
      });
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
#right-click-menu {
  background: #fafafa;
  border: 1px solid #bdbdbd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 250px;
  z-index: 999999;
}

#right-click-menu li {
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
  padding: 5px 35px;
}

#right-click-menu li:last-child {
  border-bottom: none;
}

#right-click-menu li:hover {
  background: #1e88e5;
  color: #fafafa;
}
</style>
