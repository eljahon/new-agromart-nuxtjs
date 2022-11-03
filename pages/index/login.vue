<template>
  <div
    class="mx-auto py-6 px-4 lg:px-8 bg-cover"
  >
    <div
      class="
        max-w-7xl
        mx-auto
        lg:px-8
        py-8
        px-3
      "
    >
      <div class="max-w-2xl mx-auto bg-white p-5 rounded-md w-full">
        <div class="flex justify-center items-center mb-3">
          <div id="signin">
            <button
              class="text-2xl font-medium text-gray-800 focus:outline-none"
              @click="activetab = 'signin'"
            >
              {{ $t('word.login') }}
            </button>
          </div>
        </div>

        <!-- <socials /> -->
        <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
          <form class="space-y-5 mt-5" @submit.prevent="passes(tryToLogIn)">
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required|phoneOrEmail"
              name="Username"
            >
              <div class="mt-1">
                <input
                  v-model="auth.identifier"
                  :state="errors[0] ? false : valid ? true : null"
                  name="text"
                  type="text"
                  autocomplete="text"
                  :placeholder="$t('word.phone')"
                  required
                  :class="
                    valid || authError.length === 0
                      ? 'border-green-600 focus:ring-green-600 focus:border-green-600'
                      : 'border-red-600 focus:ring-red-600 focus:border-red-600'
                  "
                  class="
                    appearance-none
                    block
                    text-xl
                    w-full
                    px-3
                    py-4
                    my-4
                    border-2 border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    sm:text-sm
                  "
                >
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-if="isEmail"
              v-slot="{ valid, errors }"
              rules="required|min:6"
              name="Password"
              vid="password"
            >
              <div class="mt-1">
                <input
                  v-model="auth.password"
                  :state="errors[0] ? false : valid ? true : null"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  :placeholder="$t('word.password')"
                  required
                  :class="
                    valid || authError.length === 0
                      ? 'border-green-600 focus:ring-green-600 focus:border-green-600'
                      : 'border-red-600 focus:ring-red-600 focus:border-red-600'
                  "
                  class="
                    appearance-none
                    block
                    text-lg
                    w-full
                    px-3
                    py-4
                    border-2 border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    sm:text-sm
                  "
                >
              </div>
            </ValidationProvider>
            <div class="flex items-center justify-between mb-0">
              <div v-if="authError.length > 0" class="text-red-600 text-sm">
                {{ authError }}
              </div>
              <div v-if="isEmail" class="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  class="h-5 w-5 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                >
                <label for="remember_me" class="ml-2 block text-gray-600 text-base">
                  {{ $t('word.remember') }}
                </label>
              </div>

              <!-- <div class="text-sm">
                <button type="reset" :class="['border-b border-green-600 text-green-600']" class="font-medium text-base text-green-600 hover:text-green-800 focus:outline-none" @click="openForgotPassword()">
                  Parolni tiklash
                </button>
              </div> -->
            </div>
            <button
              type="submit"
              :disabled="invalid"
              class="
                w-full
                flex
                justify-center
                px-4
                py-4
                border border-transparent
                rounded-md
                shadow-sm
                text-base
                font-medium
                text-white
                bg-green-600
                hover:bg-green-700
                focus:outline-none
              "
            >
              {{ $t('word.login') }}
              <vue-loaders v-if="loading" name="ball-beat" color="white" scale="0.5" />
            </button>
          </form>
          <div class="flex items-center justify-center mt-3">
            <p class="text-gray-600 text-base font-medium">
              {{ $t('text.haveNotAccount') }}
            </p>
            <div
              class="ml-2 text-light-orange text-base cursor-pointer font-medium focus:outline-none"
              @click="toRegister()"
            >
              {{ $t('word.register') }}
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
// import Socials from '~/components/core/Socials.vue'
import forgotPassword from '~/modals/forgot-password.vue'
import appConfig from '~/app.config'
import confirmCodeModal from '~/modals/confirm-code'
export default {
  auth: false,
  page: {
    title: 'Log in',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }]
  },
  components: {
    // Socials
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    status: String
  },
  data () {
    return {
      activetab: 'signin',
      auth: {
        identifier: '',
        password: ''
      },
      authError: '',
      tryingToLogIn: false,
      isAuthError: false,
      loading: false,
      isEmail: false,
      product: {}
    }
  },
  watch: {
    'auth.identifier' () {
      const EMAILREG =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (EMAILREG.test(this.auth.identifier)) {
        this.isEmail = true
      } else {
        this.isEmail = false
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    toRegister () {
      this.$router.push(this.localePath('/register'))
    },
    async tryToLogIn () {
      this.authError = ''
      this.loading = true
      if (this.auth.identifier.includes('+') > 0) {
        this.auth.identifier = this.auth.identifier.substring(1)
      }
      if (this.isEmail) {
        this.$snotify.info('Logging in...')
        await this.$auth
          .loginWith('local', {
            data: this.auth
          })
          .then(async (res) => {
            await this.$auth.setToken('local', 'Bearer ' + res.data.jwt)
            // await this.$auth.setRefreshToken('local', res.data.refresh)
            await this.$axios.setHeader('Authorization', 'Bearer ' + res.data.jwt)
            await this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + res.data.jwt)
            localStorage.setItem('user_info', JSON.stringify(res.data.user))
            await this.$auth.setUser(res.data.user)
            await this.$snotify.success('Successfully Logged In')
            this.loading = false
            if (this.$route.query.from === 'consultant') {
              this.$store
                .dispatch('crud/chats/room/postRooms', {
                  data: {
                    consultantID: this.$route.query.consultantID,
                    userID: res.data.user.id,
                    isCompleted: false
                  }
                })
                .then((res) => {
                  this.$bridge.$emit('selected_room', { room_id: res.id })
                  this.$router.push({
                    path: this.localePath('/chats'),
                    query: { room_id: res.id, consultant_id: this.$route.query.consultantID }
                  })
                })
            } else if (this.$route.query.from === 'trading') {
              this.$router.push({
                path: this.localePath("/my-chats"),
                query: {
                  room_id: "new",
                  product_id: this.$route.query.product_id,
                  owner_id: this.$route.query.questionerID,
                  status: "buy",
                },
              });
              this.$store
                .dispatch('crud/chats/room/postRooms', {
                  data: {
                    consultantID: this.product.userid.id,
                    userID: res.data.user.id,
                    istradingchat: true,
                    tradingpost: this.product
                  }
                })
                .then((res) => {
                  this.$bridge.$emit('selected_room', { room_id: res.id })
                  this.$router.push({
                    path: this.localePath('/my-chats'),
                    query: { room_id: res.id, product_id: this.product.id }
                  })
                })
            } else if (this.$route.query.from === 'newTrading') {
              this.$router.push(
                this.localePath('/my-products/new')
              )
            } else {
              this.$router.push(this.localePath('/'))
            }
          })
          .catch((e) => {
            this.toRegister()
            this.authError = e.response.data.data[0].messages[0].message
            this.loading = false
          })
      } else {
        await this.$axios
          .post('/users-permissions/login-verify-otp', { phone: this.auth.identifier }).then((res) => {
            this.loading = false
            this.confirmCode({ username: this.auth.identifier, isLogin: true, isOtpSuccess: null })
          })
          .catch((e) => {
            this.authError = e.response.data.data[0].messages[0].message
            this.loading = false
          })
      }
    },
    confirmCode (user) {
      this.$emit('close')
      this.$modal.show(
        confirmCodeModal,
        { user },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 400 ? window.innerWidth - 10 : 400,
          acrollable: true
        }
      )
      this.$root.$once('confirm-code', (item) => {})
    },
    openForgotPassword () {
      this.$emit('close')
      this.$modal.show(
        forgotPassword,
        { status: 'forgot-password' },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          scrollable: true
        }
      )
    },
    fetchData () {
      if (this.$route.query.from === 'trading') {
        this.$store.dispatch('crud/trading/getTradingById', { id: this.$route.query.productID }).then((res) => {
          this.product = res
        })
      }
    }
  }
}
</script>
