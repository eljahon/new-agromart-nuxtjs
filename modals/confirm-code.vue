<template>
  <div class="">
    <div
      class="float-right text-center p-1 m-3 rounded-md hover:bg-gray-100 cursor-pointer"
      @click="onClose('canceled')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="fill: rgba(75, 85, 99, 1); transform: ; -ms-filter: "
      >
        <path
          d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"
        />
      </svg>
    </div>
    <div class="py-8 px-3 sm:px-10">
      <div class="mt-3">
        <p class="text-gray-500 text-sm text-center">
          {{ user.username }} {{ $t('text.resendText') }}
        </p>
      </div>

      <div class="my-6 flex justify-center">
        <div>
          <the-mask
            id="first-number"
            ref="mask"
            v-model="code.first"
            :mask="['#']"
            type="text"
            name="first-number"
            class="text-center rounded-md w-11 h-11"
            placeholder="*"
          />
          <the-mask
            id="second-number"
            v-model="code.second"
            :mask="['#']"
            type="text"
            name="second-number"
            class="text-center rounded-md w-11 h-11"
            placeholder="*"
          />
          <the-mask
            id="third-number"
            v-model="code.third"
            :mask="['#']"
            type="text"
            name="third-number"
            class="text-center rounded-md w-11 h-11"
            placeholder="*"
          />
          <the-mask
            id="fourth-number"
            v-model="code.fourth"
            :mask="['#']"
            type="text"
            name="fourth-number"
            class="text-center rounded-md w-11 h-11"
            placeholder="*"
          />
        </div>
      </div>
      <p :class="[timer === 'on' ? '' : 'hidden']" class="text-sm text-gray-500 mb-2">
        {{ $t('text.confirmCodeText') }}
        <countdown
          v-if="timer === 'on'"
          class="text-primary font-semibold"
          :end-time="timerMinutes"
          @finish="onCountdownEnd"
        >
          <template #process="scope">
            <span class="ml-1">{{ scope.timeObj.m }} : {{ scope.timeObj.s }}</span>
          </template>
        </countdown>
        {{ $t('text.confirmCodeText1') }}
      </p>
      <button
        :disabled="otp.length < 4"
        class="rounded-md text-base p-2 w-full"
        :class="otp.length === 4 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'"
        @click="checkOtp()"
      >
        {{ $t('text.confirmCode') }}
      </button>
      <div v-if="times < 3" class="flex justify-center mt-3">
        <p class="text-gray-600 text-sm">
          {{ $t('text.didntGetCode') }}
        </p>
        <button
          :class="timer !== 'on' ? 'text-yellow-500' : 'text-gray-400'"
          class="text-sm ml-1 focus:outline-none"
          :disabled="timer === 'on'"
          @click="resendCode()"
        >
          {{ $t('text.resend') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import newPasswordModal from '~/modals/new-password'
export default {
  name: 'ResetPassword',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timer: 'on',
      timerMinutes: new Date().getTime() + 180000,
      times: 1,
      code: {
        first: '',
        second: '',
        third: '',
        fourth: ''
      },
      otp: '',
      codeLoading: false,
      userExample: {}
    }
  },
  watch: {
    'code.first' () {
      this.checkAuth()
      if (this.code.first === '') {
        document.getElementById('first-number').focus()
      } else {
        document.getElementById('second-number').focus()
      }
    },
    'code.second' () {
      this.checkAuth()
      if (this.code.second === '') {
        document.getElementById('first-number').focus()
      } else {
        document.getElementById('third-number').focus()
      }
    },
    'code.third' () {
      this.checkAuth()
      if (this.code.third === '') {
        document.getElementById('second-number').focus()
      } else {
        document.getElementById('fourth-number').focus()
      }
    },
    'code.fourth' () {
      this.checkAuth()
      if (this.code.fourth === '') {
        document.getElementById('third-number').focus()
      }
    }
  },
  mounted () {
    if (this.user.isOtpSuccess === false) {
      this.resendCode()
    }
  },
  methods: {
    checkAuth () {
      this.otp = ''
      this.otp =
        this.code.first +
        this.code.second +
        this.code.third +
        this.code.fourth
    },
    resendCode () {
      this.$axios
        .post('/users-permissions/resend-otp', { phone: this.user.username })
        .then((res) => {
          this.times++
          if (this.times === 2) {
            this.timerMinutes = new Date().getTime() + 240000
          } else if (this.times === 3) {
            this.timerMinutes = new Date().getTime() + 300000
          }
          this.timer = 'on'
        })
        .catch((error) => {
          this.$snotify.error(error)
        })
    },
    onCountdownEnd () {
      this.timer = 'off'
    },
    openNewPassword () {
      this.$emit('close')
      this.$modal.show(
        newPasswordModal,
        { status: 'new-password' },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          acrollable: true
        }
      )
    },
    async checkOtp () {
      if (this.user.isLogin) {
        await this.$axios
          .post('/users-permissions/login-otp', { phone: this.user.username, otpcode: this.otp })
          .then((res) => {
            this.someMethods(res.data)
          })
          .catch((e) => {
            this.authError = e
            this.isAuthError = true
            this.$snotify.error('Failed Logging In')
          })
      } else {
        await this.$axios
          .post('/users-permissions/verify', { username: this.user.username, otpcode: this.otp })
          .then((res) => {
            this.someMethods(res.data)
          })
          .catch((e) => {
            this.authError = e
            this.isAuthError = true
            this.$snotify.error('Failed Logging In')
          })
      }
    },
    async someMethods (res) {
      this.$snotify.info('Logging in...')
      localStorage.setItem('local', 'Bearer ' + res.jwt)
      await this.$auth.setToken('local', 'Bearer ' + res.jwt)
      await this.$axios.setHeader('Authorization', 'Bearer ' + res.jwt)
      await this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + res.jwt)
      localStorage.setItem('user_info', JSON.stringify(res.user))
      await this.$auth.setUser(res.user)
      await this.$snotify.success('Successfully Logged In')
      this.loading = false
      if (this.$route.query.from === 'consultant') {
        this.$store.dispatch('crud/chats/room/getRooms', {
          '_where[0][consultantID.id][0]': this.$route.query.consultantID,
          '_where[0][userID.id][0]': res.user.id,
          '_where[0][isCompleted]': false
        }).then((res) => {
          if (res.length > 0) {
            this.$bridge.$emit('selected_room', { room_id: res[0].id })
            this.$router.push({
              path: this.localePath('/chats'),
              query: { room_id: res[0].id, consultant_id: this.$route.query.consultantID }
            })
          } else {
            this.$router.push({
              path: this.localePath('/chats'),
              query: { room_id: 'new', consultant_id: this.$route.query.consultantID }
            })
          }
        })
        // this.$store
        //   .dispatch('crud/chats/room/postRooms', { data: { consultantID: this.$route.query.consultantID, userID: res.user.id, isCompleted: false } })
        //   .then((msg) => {
        //     this.$bridge.$emit('selected_room', { room_id: msg.id })
        //     this.$router.push({
        //       path: this.localePath('/chats'),
        //       query: { room_id: msg.id, consultant_id: this.$route.query.consultantID }
        //     })
        //   })
      } else if (this.$route.query.from === 'newTrading') {
        this.$router.push({
          path: this.localePath('/my-products/new')
        })
      } else {
        this.$router.push({
          path: this.localePath('/')
        })
      }
      this.onClose()
    },
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('confirm-code', e)
    }
  }
}
</script>
