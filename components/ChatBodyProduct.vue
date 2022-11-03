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
          class="
            flex
            sm:items-center
            justify-between
            pb-3
            pt-0
            border-b-2 border-gray-200
          "
        >
          <div class="relative flex items-center space-x-4">
            <div class="relative">
              <img
                :src="
                  receiver && receiver.avatar
                    ? $tools.getFileUrl(receiver.avatar)
                    : require('/assets/images/person/avatar.jpg')
                "
                @error="
                  receiver.avatar = require('/assets/images/person/avatar.jpg')
                "
                alt=""
                class="w-8 sm:w-12 h-8 sm:h-12 rounded-full"
              />
            </div>
            <div class="flex flex-col leading-tight">
              <div class="text-lg mt-1 flex items-center">
                <span class="text-gray-700 mr-3">{{
                  `${receiver.name ? receiver.name : ""} ${
                    receiver.surname ? receiver.surname : ""
                  }`
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          id="messages"
          class="
            flex flex-col
            space-y-4
            p-3
            overflow-y-auto
            scrollbar-thumb-blue
            scrollbar-thumb-rounded
            scrollbar-track-blue-lighter
            scrollbar-w-2
            scrolling-touch
          "
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
                class="
                  flex flex-col
                  space-y-2
                  text-xs
                  max-w-xs
                  mx-2
                  order-1
                  items-end
                "
                @click.prevent.stop="handleClick($event, message)"
              >
                <div
                  class="
                    px-4
                    py-2
                    rounded-lg
                    inline-block
                    rounded-br-none
                    text-gray-600 text-sm
                    bg-green-100
                  "
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
                class="
                  flex flex-col
                  space-y-2
                  text-xs
                  max-w-xs
                  mx-2
                  order-2
                  items-start
                "
              >
                <div
                  class="
                    px-4
                    py-2
                    rounded-lg
                    inline-block
                    rounded-bl-none
                    text-gray-600
                    bg-orange-50
                  "
                >
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
          v-if="!currentRoom.isCompleted || $route.query.room_id === 'new'"
          class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
        >
          <div class="relative flex">
            <textarea
              v-model="message.text"
              :rows="1"
              :placeholder="$t('text.writeYourMessage')"
              class="
                w-full
                focus:outline-none focus:border-green-300
                pr-20
                focus:placeholder-gray-400
                text-gray-600
                placeholder-gray-600
                bg-gray-200
                rounded-md
                py-3
              "
              @keyup.enter="sendMessage()"
            />
            <div class="absolute right-0 items-center inset-y-0 flex">
              <button
                type="button"
                class="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  h-10
                  w-10
                  transition
                  duration-500
                  ease-in-out
                  text-gray-500
                  hover:bg-gray-300
                  focus:outline-none
                "
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
                class="
                  text-blue-400
                  hover:bg-blue-300 hover:text-blue-600
                  inline-flex
                  items-center
                  mr-1
                  justify-center
                  rounded-full
                  h-10
                  w-10
                  transition
                  duration-500
                  ease-in-out
                  focus:outline-none
                "
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
import deleteModal from "~/modals/delete.vue";
import sendMedia from "~/modals/send-media.vue";
import { socket } from "~/plugins/socket.client.js";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
export default {
  auth: true,
  components: {
    VueSimpleContextMenu,
  },
  props: {},
  data() {
    return {
      chatMessage: "",
      advice: {
        rating: 0,
        comment: "",
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
      receiver: {},
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
    ...mapState({}),
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
            this.loading = false;
            this.setMessage();
          });
        });
      });
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
    this.fetchData().then(async () => {
      await this.fetchCurrentRoom();
      await this.setWindowWidth();
      if (this.$route.query.room_id !== "new") await this.setMessage();
      this.loading = false;
    });
  },
  beforeDestroy() {
    this.socketDisconnector();
  },
  methods: {
    mediaChange({ target }) {
      const formData = new FormData();
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
            this.message.receiverID = this.receiver.id;
            this.message.senderID = this.currentUser.id;
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
      console.log(`${this.receiver.username} leaved`);
    },
    sendMessage() {
      if (this.message.text === 0 || this.message.text.trim().length === 0) {
        return;
      }
      if (this.$route.query.room_id === "new") {
        this.$store
          .dispatch("crud/chats/room/postRooms", {
            data: {
              consultantID: this.receiver.id,
              userID: this.currentUser.id,
              istradingchat: true,
              tradingpost: this.product.id,
            },
          })
          .then(async (res) => {
            this.currentRoom = res;
            this.message.roomID = res.id;
            this.message.receiverID = this.receiver.id;
            this.message.senderID = this.currentUser.id;
            await this.$store.dispatch("socket/createRoom", res);
            await this.$bridge.$emit("selected_room", { room_id: res.id });
            await this.sendMessageToSocket({ ...this.message });
            await this.$router.push({
              path: this.localePath("/my-chats"),
              query: {
                room_id: res.id,
                product_id: this.$route.query.product_id,
                status: "buy",
              },
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
      if (this.$route.query.status === "sell") {
        this.message = {
          roomID: this.currentRoom.id,
          senderID: this.currentUser.id,
          receiverID: this.currentRoom.userID.id,
          text: "",
          filePath: null,
          activityID: null,
          seen: false,
        };
      } else {
        this.message = {
          roomID: this.currentRoom.id,
          senderID: this.currentRoom.userID.id,
          receiverID: this.currentRoom.consultantID.id,
          text: "",
          filePath: null,
          activityID: null,
          seen: false,
        };
      }
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
            if (this.$route.query.status === "sell") {
              this.receiver = this.currentRoom.userID;
              return;
            }
            this.receiver = this.currentRoom.consultantID;
          });
      }
      if (this.$route.query.owner_id) {
        await this.$store
          .dispatch("crud/user/getUsersById", {
            id: this.$route.query.owner_id,
          })
          .then((res) => {
            this.receiver = res;
          });
      }
    },
    async fetchData() {
      await this.$store
        .dispatch("crud/trading/getTradingById", {
          id: this.$route.query.product_id,
        })
        .then((res) => {
          this.product = res;
        });
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
