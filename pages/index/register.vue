<template>
  <div class="mx-auto py-6 px-4 lg:px-8 bg-cover">
    <div class="max-w-7xl mx-auto lg:px-8 py-8 px-3 sm:px-10">
      <div class="max-w-2xl mx-auto bg-white p-5 rounded-md w-full">
        <div class="flex justify-center items-center mb-3">
          <div id="signin">
            <button class="text-2xl font-medium text-gray-800 focus:outline-none" @click="activetab = 'signin'">
              {{ $t('word.register') }}
            </button>
          </div>
        </div>
        <div>
          <!-- <socials /> -->
          <ValidationObserver v-slot="{ handleSubmit }" slim>
            <form class="space-y-4 mt-5" novalidate @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider
                v-slot="{ errors }"
                name="first_name"
                rules="required"
                mode="eager"
              >
                <input
                  v-model="user.name"
                  name="first name"
                  type="text"
                  :placeholder="$t('word.name')"
                  required
                  :class="
                    errors.length > 0
                      ? 'border-red-400 focus:ring-red-600 focus:border-red-600'
                      : 'border-gray-300 focus:ring-green-600 focus:border-green-600'
                  "
                  class="
                  appearance-none
                  my-4
                  block
                  w-full
                  px-3
                  py-4
                  border
                  rounded-md
                  shadow-sm
                  placeholder-gray-400
                  focus:outline-none
                  sm:text-sm
                "
                >
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="last_name"
                rules="required"
                mode="eager"
              >
                <input
                  v-model="user.surname"
                  name="last name"
                  type="text"
                  :placeholder="$t('word.surname')"
                  required
                  :class="
                    errors.length > 0
                      ? 'border-red-400 focus:ring-red-600 focus:border-red-600'
                      : 'border-gray-300 focus:ring-green-600 focus:border-green-600'
                  "
                  class="
                  appearance-none
                  my-4
                  block
                  w-full
                  px-3
                  py-4
                  border
                  rounded-md
                  shadow-sm
                  placeholder-gray-400
                  focus:outline-none
                  sm:text-sm
                "
                >
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors, classes }"
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
                  mb-4
                  block
                  w-full
                  px-3
                  py-4
                  border
                  rounded-md
                  shadow-sm
                  placeholder-gray-400
                  focus:outline-none
                  sm:text-sm
                "
                >
                <template v-if="classes.dirty || classes.validated">
                  <span v-for="error in errors" :key="error" class="text-red-600 text-xs">{{
                    error
                  }}</span>
                </template>
              </ValidationProvider>
              <ValidationProvider
                v-if="isEmail"
                v-slot="{ errors, classes }"
                name="password"
                :rules="{ required: true, min: 6 }"
                mode="eager"
              >
                <div class="relative flex mt-2">
                  <input
                    v-model="user.password"
                    name="password"
                    :type="hidden.password ? 'password' : 'text'"
                    :placeholder="$t('word.password')"
                    required
                    :class="
                      errors.length > 0
                        ? 'border-red-400 focus:ring-red-600 focus:border-red-600'
                        : 'border-gray-300 focus:ring-green-600 focus:border-green-600'
                    "
                    class="
                    appearance-none
                    block
                    mb-3
                    w-full
                    px-3
                    py-4
                    border
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    focus:outline-none
                    sm:text-sm
                  "
                  >
                  <div class="absolute right-2 top-2 text-xl text-gray-500 cursor-pointer">
                    <i
                      :class="[hidden.password ? 'bx-show' : 'bx-hide']"
                      class="bx"
                      @click="hidden.password = !hidden.password"
                    />
                  </div>
                </div>
                <template v-if="classes.dirty || classes.validated">
                  <span v-for="error in errors" :key="error" class="text-red-600 text-xs">{{
                    error
                  }}</span>
                </template>
              </ValidationProvider>
              <ValidationProvider
                v-if="isEmail"
                v-slot="{ errors}"
                name="confirm_password"
                :rules="{ required: true, samePassword: user.password }"
                mode="eager"
              >
                <div class="relative flex mt-2">
                  <input
                    v-model="confirm_password"
                    name="confirm_password"
                    :type="hidden.confirm_password ? 'password' : 'text'"
                    :placeholder="$t('text.confirmPassword')"
                    required
                    :class="
                      errors.length > 0
                        ? 'border-red-400 focus:ring-red-600 focus:border-red-600'
                        : 'border-gray-300 focus:ring-green-600 focus:border-green-600'
                    "
                    class="
                    appearance-none
                    block

                    w-full
                    px-3
                    py-4
                    border
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    focus:outline-none
                    sm:text-sm
                  "
                  >
                  <div class="absolute right-2 top-2 text-xl text-gray-500 cursor-pointer">
                    <i
                      :class="[hidden.confirm_password ? 'bx-show' : 'bx-hide']"
                      class="bx"
                      @click="hidden.confirm_password = !hidden.confirm_password"
                    />
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors, classes }"
                name="terms"
                rules="required"
                mode="eager"
              >
                <div class="flex items-center mt-4">
                  <input
                    v-model="isAgree"
                    name="termsOfUse"
                    type="checkbox"
                    :error-messages="errors"
                    :value="true"
                    class="h-5 w-5 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                  >
                  <label for="termsOfUse" class="ml-2 block text-gray-600 text-base">
                    <span class="text-green-600 border-b border-green-600" @click="toTermsOfService()">
                      Foydalanish qoidalari
                    </span>
                    ga roziman
                  </label>
                </div>
                <template v-if="classes.dirty || classes.validated">
                  <span v-for="error in errors" :key="error" class="text-red-600 text-sm">{{
                    error
                  }}</span>
                </template>
              </ValidationProvider>
              <div>
                <button
                  type="submit"
                  class="
                  mt-4
                  w-full
                  py-4
                  px-4
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
                  {{ $t('word.register') }}
                </button>
              </div>
            </form>
          </ValidationObserver>
          <div class="flex items-center justify-center mt-3">
            <p class="text-gray-600 text-base font-medium">
              {{ $t('text.haveAccount') }}
            </p>
            <div
              class="ml-2 text-light-orange text-base font-medium cursor-pointer focus:outline-none"
              @click="toSignin()"
            >
              {{ $t('text.signIn') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import termsOfService from '~/modals/terms-of-service.vue'
// import Socials from '~/components/core/Socials.vue'
import confirmCodeModal from '~/modals/confirm-code'
export default {
  auth: false,
  components: {
    // Socials
  },
  props: {
    // status: {
    //   required: true,
    //   type: String
    // }
  },
  data () {
    return {
      phoneOrEmail: '',
      user: {
        name: '',
        surname: '',
        password: ''
      },
      confirm_password: '',
      isAgree: false,
      hidden: {
        password: true,
        confirm_password: true
      },
      isEmail: false
    }
  },
  watch: {
    phoneOrEmail () {
      const EMAILREG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (EMAILREG.test(this.phoneOrEmail)) {
        this.isEmail = true
      } else {
        this.isEmail = false
      }
    }
  },
  methods: {
    ...mapActions({
      signUp: 'register'
    }),
    toSignin () {
      this.$router.push(this.localePath('/login'))
    },
    async onSubmit () {
      if (this.phoneOrEmail.includes('@') > 0) {
        this.user.email = this.phoneOrEmail
        this.username = this.user.email
        delete this.user.phone
      } else if (this.phoneOrEmail.includes('+') > 0) {
        this.user.phone = this.phoneOrEmail.substring(1)
        this.user.username = this.user.phone
        delete this.user.email
        delete this.user.password
      } else {
        this.user.phone = this.phoneOrEmail
        this.user.username = this.phoneOrEmail
        delete this.user.email
        delete this.user.password
      }
      await this.$axios.post('/auth/local/register', this.user).then(async (res) => {
        if (this.isEmail) {
          this.$snotify.info('Logging in...')
          localStorage.setItem('local', 'Bearer ' + res.jwt)
          await this.$auth.setToken('local', 'Bearer ' + res.jwt)
          await this.$axios.setHeader('Authorization', 'Bearer ' + res.jwt)
          await this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + res.jwt)
          localStorage.setItem('user_info', JSON.stringify(res.user))
          await this.$auth.setUser(res.user)
          await this.$snotify.success('Successfully Logged In')
          this.loading = false
          this.onClose()
          return
        }
        if (res.data === false) {
          this.confirmCode({ username: this.user.phone, isOtpSuccess: false, isLogin: null })
          return
        }
        this.confirmCode({ username: res.data.user.phone, isOtpSuccess: null, isLogin: null })
      // eslint-disable-next-line no-console
      }).catch((e) => { console.error(e) })
    },
    toTermsOfService () {
      this.$emit('close')
      this.$modal.show(
        termsOfService,
        { status: 'terms-of-service' },
        {
          height: 700,
          maxWidth: 700,
          width: window.innerWidth <= 700 ? window.innerWidth - 10 : 700,
          acrollable: true
        }
      )
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
    },
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('sign-up', e)
    }
  }
}
</script>
