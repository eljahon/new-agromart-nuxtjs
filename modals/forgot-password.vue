<template>
  <div class="py-8 px-3 sm:px-10">
    <div class="flex items-center justify-between">
      <div class="text-gray-700 text-lg">
        {{ $t(status) }}
      </div>
      <div class="float-right text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer" @click="onClose('canceled')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(75, 85, 99, 1);transform:;-ms-filter:">
          <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
        </svg>
      </div>
    </div>
    <div class="">
      <div>
        <div class="mt-3">
          <div>
            <p class="text-gray-500 text-sm">
              Parolni tiklash uchun ro'yxatdan o'tgan telefon raqam
              yoki emailingizni kiriting. Kiritilgan raqam yoki emailga
              parolni tiklash uchun 5ta raqamli kod yuboriladi.
            </p>
            <p class="text-gray-500 text-sm mt-1">
              Parol tiklashda muommolaringiz bormi? <span class="text-green-600 ml-1 border-b border-green-600">Yordam</span>
            </p>
          </div>
          <ValidationObserver v-slot="{ handleSubmit }" slim>
            <form novalidate @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider
                v-slot="{ errors}"
                name="Phone or email"
                rules="required|phoneOrEmail"
                mode="eager"
              >
                <input
                  v-model="phoneOrEmail"
                  name="phone or email"
                  type="text"
                  :placeholder="$t('text.mailOrPhone')"
                  required
                  :class="
                    errors.length > 0
                      ? 'border-red-400 focus:ring-red-600 focus:border-red-600'
                      : 'border-gray-300 focus:ring-green-600 focus:border-green-600'
                  "
                  class="
                  appearance-none
                  my-3
                  block
                  w-full
                  px-3
                  py-2
                  border
                  rounded-md
                  shadow-sm
                  placeholder-gray-400
                  focus:outline-none
                  sm:text-sm
                "
                >
              </ValidationProvider>

              <button :disabled="!phoneOrEmail" :class="phoneOrEmail.length === 12 ? 'bg-green-600' : 'bg-gray-400'" class=" rounded-md  text-white text-base p-2 w-full focus:outline-none">
                Tiklash kodini yuborish
              </button>
            </form>
          </ValidationObserver>
        </div>
        <div class="flex justify-between mt-3">
          <div class="text-light-orange cursor-pointer text-sm focus:outline-none" @click="openSignIn()">
            Kirish
          </div>

          <div class="flex items-center">
            <p class="text-sm text-gray-600">
              Akkauntingiz yo'qmi?
            </p>
            <div class="text-green-600 cursor-pointer ml-2 focus:outline-none text-sm" @click="openSignUp()">
              A'zo bo'lish
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import signInModal from '~/modals/sign-in'
import signUpModal from '~/modals/sign-up'
import resetPasswordModal from '~/modals/reset-password'
export default {
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    status: String
  },
  data () {
    return {
      phoneOrEmail: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    openSignIn () {
      this.$emit('close')
      this.$modal.show(
        signInModal,
        { status: 'sign-in' },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          acrollable: true
        }
      )
    },
    openSignUp () {
      this.$emit('close')
      this.$modal.show(
        signUpModal,
        { status: 'sign-up' },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          acrollable: true
        }
      )
    },
    onSubmit () {
      if (this.phoneOrEmail.includes('@') > 0) {
        this.user.mail = this.phoneOrEmail
      } else if (this.phoneOrEmail.includes('+') > 0) {
        this.user.phone = this.phoneOrEmail.substring(1)
      } else {
        this.user.phone = this.phoneOrEmail
      }
      this.openResetPassword()
    },
    openResetPassword () {
      this.$emit('close')
      this.$modal.show(
        resetPasswordModal,
        { status: 'reset-password' },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          acrollable: true
        }
      )
    },
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('forgot-password', e)
    }
  }
}
</script>
