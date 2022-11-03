<template>
  <div class="border rounded-md shadow-md p-4 h-auto flex">
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main
          class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
        >
          <article>
            <!-- Profile header -->
            <div>
              <div>
                <img
                  class="h-32 w-full object-cover lg:h-48"
                  src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt=""
                />
              </div>
              <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div class="flex relative cursor-pointer">
                    <img
                      class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                      :src="$tools.getFileUrl(avatar)"
                      alt=""
                    />
                    <div class="bottom-0 text-center absolute w-24 h-12 sm:w-32 sm:h-16 bg-gray-600 bg-opacity-50 rounded-b-full">
                      <i class="bx bx-camera text-gray-900 sm:text-4xl text-3xl" />
                    </div>
                  </div>
                  <div
                    class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                  >
                    <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                      <h1 class="text-2xl font-bold text-gray-900 truncate">
                        {{ `${currentUser.name} ${currentUser.surname}` }}
                      </h1>
                    </div>
                    <div
                      class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <button
                        type="button"
                        class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        <!-- Heroicon name: solid/mail -->
                        <svg
                          class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                          />
                          <path
                            d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                          />
                        </svg>
                        <span>{{ $t("text.myChats") }}</span>
                      </button>
                      <button
                        type="button"
                        class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        <!-- Heroicon name: solid/phone -->
                        <i
                          class="bx bx-edit -ml-1 mt-1 mr-2 h-5 w-5 text-gray-400"
                        />
                        <span>{{ $t("word.edit") }}</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                  <h1 class="text-2xl font-bold text-gray-900 truncate">
                    {{ `${currentUser.name} ${currentUser.surname}` }}
                  </h1>
                </div>
              </div>
            </div>

            <!-- Description list -->
            <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">{{ $t('word.phone') }}</dt>
                  <dd v-if="currentUser.phone && currentUser.phone.length > 0" class="mt-1 text-sm text-gray-900">{{ $tools.phoneFormatter(currentUser.phone) }}</dd>
                </div>

                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">{{ $t('word.email') }}</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ currentUser.email }}
                  </dd>
                </div>

                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">{{ $t('word.address') }}</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ currentUser.address }}</dd>
                </div>

                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">{{ $t('word.gender') }}</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ currentUser.gender }}</dd>
                </div>

                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">{{ $t('text.languageOfSystem') }}</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ currentUser.language }}</dd>
                </div>

                <!-- <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Birthday</dt>
                  <dd class="mt-1 text-sm text-gray-900">June 8, 1990</dd>
                </div> -->

                <div class="sm:col-span-2">
                  <dt class="text-sm font-medium text-gray-500">{{ $t('text.aboutMe') }}</dt>
                  <dd class="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                    <p>
                      {{ currentUser.about }}
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import imageEditor from "~/modals/image-editor.vue";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  name: "MyProfile",
  auth: true,
  data() {
    return {
      currentUser: {
        name: '',
        surname: '',
        phone: '',
        email: '',
        gender: null,
        language: null,
        about: '',
        address: ''
      },
      genders: [],
      handleLoad: true,
      avatar: null,
    };
  },
  computed: {
    ...mapState({}),
  },
  created() {
    this.handleLoad = false;
    if (!process.client) {
      return
    }
    this.currentUser = JSON.parse(localStorage.getItem('user_info'))
    this.avatar = this.currentUser.avatar ? this.currentUser.avatar : require('/assets/images/person/avatar.jpg')
  },
  mounted() {
    this.fetchData();
  },
  validations: {
    currentUser: {
      name: { required },
      surname: { required },
      gender: { required },
      language: { required },
    },
  },
  mixins: [validationMixin],
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.currentUser.avatar = this.avatar;
        console.log("User: ", this.currentUser);
        // this.$store
        //   .dispatch('crud/user/updateUsers', {
        //     data: this.user,
        //   })
        //   .then((res) => {
        //     this.currentUser = res;
        //     this.$auth.setUser(res);
        //   });
      }
    },
    uploadAvatar() {
      this.openImageEditor("avatar", null);
      this.$root.$once("image-editor-modal", (item) => {
        if (item !== "canceled") {
          console.log("AVatar: ", item);
          this.avatar = item.thumbnail;
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
    editAvatar(url) {
      this.openImageEditor("avatar", url);
      this.$root.$once("image-editor-modal", (item) => {
        if (item !== "canceled") {
          this.avatar = item.thumbnail;
        }
      });
    },
    deleteAvatar(data) {
      this.currentUser.avatar = null;
    },
    async fetchData() {
      await this.$store.dispatch("crud/gender/getGenders").then((res) => {
        this.genders = res;
      });
    },
  },
};
</script>
