<template>
  <div>
    <div class="py-8 px-3 sm:px-10">
      <div class="flex justify-between">
        <div :class="[activetab === '1' || activetab === '2' ? '' : 'hidden']" class="flex justify-between items-center mb-3">
          <div id="signin">
            <button :class="[activetab === '1' ? 'border-b border-green-600 text-green-600': 'hover:text-green-600 text-gray-600']" class="text-xl font-medium text-gray-500 focus:outline-none" @click="activetab = '1'">
              Kirish
            </button>
          </div>

          <div id="register">
            <button :class="[activetab === '2' ? 'border-b border-green-600 text-green-600': 'hover:text-green-600  text-gray-600']" class="text-xl font-medium text-gray-500 ml-6 focus:outline-none" @click="activetab = '2'">
              A'zo bo'lish
            </button>
          </div>
        </div>
        <div class="flex justify-between">
          <div>
            <button :class="[activetab === '3' ? 'block': 'hidden']" class="text-xl font-medium text-gray-600 focus:outline-none">
              Parolni tiklash
            </button>
          </div>
          <div>
            <button :class="[activetab === '4' ? '': 'hidden']" class="text-xl flex font-medium text-gray-600 focus:outline-none">
              Tiklash kodini kiriting
            </button>
          </div>
          <div>
            <button :class="[activetab === '5' ? '': 'hidden']" class="text-xl flex font-medium text-gray-600 focus:outline-none">
              Yangi parolni kiriting
            </button>
          </div>
          <div>
            <button :class="[activetab === '6' ? '': 'hidden']" class="text-xl flex font-medium text-gray-600 focus:outline-none">
              Parolingiz tiklandi
            </button>
          </div>
        </div>
        <div class="float-right text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer" @click="onClose('canceled')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(75, 85, 99, 1);transform:;-ms-filter:">
            <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
          </svg>
        </div>
      </div>
      <!-- Sign in -->

      <div v-if="activetab === '1'">
        <socials />
        <form class="space-y-6 mt-5" @submit.prevent="send">
          <div class="mt-1">
            <ValidationProvider v-slot="{errors}" :rules="{required: true, length: 16}">
              <input
                v-model="phone"
                v-mask="'+998## ###-##-##'"
                name="phone"
                type="text"
                autocomplete="text"
                placeholder="Telefon raqamingiz"
                required="required"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
              <span class="text-xs text-red-600 mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-1">
            <ValidationProvider v-slot="{errors}" :rules="{required: true, min: 8}">
              <input
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Parol"
                required="required"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
              <span class="text-xs text-red-600 mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded">
              <label for="remember_me" class="ml-2 block text-gray-600 text-sm">
                Eslab qolish
              </label>
            </div>

            <div class="text-sm">
              <button :class="[activetab === '3' ? 'border-b border-green-600 text-green-600': '']" class="font-medium text-green-600 hover:text-green-800 focus:outline-none" @click="activetab = '3'">
                Parolni tiklash
              </button>
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
              Kirish
            </button>
          </div>

          <div class=" flex items-center justify-center">
            <p class="text-gray-600 text-sm  font-medium">
              Akkauntingiz yo'qmi?
            </p>
            <button class="ml-2 text-light-orange text-sm font-medium focus:outline-none" @click="activetab = '2'">
              A'zo bo'lish
            </button>
          </div>
        </form>
      </div>

      <!-- Register -->

      <div v-if="activetab === '2'">
        <socials />
        <form class="space-y-4 mt-5" action="#" method="POST">
          <div>
            <div class="mt-1">
              <input
                name="text"
                type="text"
                autocomplete="text"
                placeholder="Telefon raqamingiz"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
            </div>
          </div>

          <div>
            <div class="mt-1">
              <input
                name="text"
                type="text"
                placeholder="To'liq ismingiz"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
            </div>
          </div>
          <div>
            <div class="mt-1">
              <input
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Parol"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
            </div>
          </div>
          <div>
            <div class="mt-1">
              <input
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Parolni tasdiqlang"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
            </div>
          </div>

          <div class="flex items-center">
            <input name="termsOfUse" type="checkbox" class="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded">
            <label for="termsOfUse" class="ml-2 block text-gray-600 text-sm">
              <span class="text-green-600 border-b border-green-600"> Foydalanish qoidalari </span> ga roziman
            </label>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
              A'zo bo'lish
            </button>
          </div>

          <div class=" flex items-center justify-center">
            <p class="text-gray-600 text-sm  font-medium">
              Akkauntingiz bormi?
            </p>
            <button class="ml-2 text-light-orange text-sm font-medium focus:outline-none" @click="activetab = '1'">
              Kirish
            </button>
          </div>
        </form>
      </div>

      <!-- Forgot password -->

      <div v-if="activetab === '3'">
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

          <div class="my-6">
            <ValidationProvider v-slot="{errors}" :rules="{required: true, length: 16}">
              <input
                v-model="phone"
                v-mask="'+998## ###-##-##'"
                name="phone"
                type="text"
                autocomplete="text"
                placeholder="Telefon raqamingiz"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
              <span class="text-xs text-red-600 mt-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="bg-gray-400 rounded-md flex justify-center" :class="{'bg-green-600' : phone.length === 16}" @click="activetab = '4'">
            <button class="text-white text-base p-2 focus:outline-none" :disabled="!phone">
              Tiklash kodini yuborish
            </button>
          </div>
        </div>
        <div class="flex justify-between mt-3">
          <div>
            <button class="text-light-orange text-sm focus:outline-none" @click="activetab = '1'">
              Kirish
            </button>
          </div>
          <div class="flex items-center">
            <p class="text-sm text-gray-600">
              Akkauntingiz yo'qmi?
            </p>
            <button class="text-green-600 ml-2 focus:outline-none text-sm" @click="activetab = '2'">
              A'zo bo'lish
            </button>
          </div>
        </div>
      </div>

      <!-- Reset Password -->

      <div v-if="activetab === '4'">
        <div class="mt-3">
          <p class="text-gray-500 text-sm">
            +998 94 645 ** ** ga 5ta raqamdan iborat kod yuborildi. Iltimos kodni kiriting.
          </p>
          <p class="text-gray-500 text-sm mt-1">
            Parol tiklashda muommolaringiz bormi? <span class="text-green-600 ml-1 border-b border-green-600">Yordam</span>
          </p>
        </div>

        <div class="my-6 flex justify-center">
          <div class="space-x-2">
            <input
              type="text"
              class="text-center rounded-md border-gray-400 w-11 h-11"
              maxLength="1"
              min="0"
              max="9"
              pattern="[0-9]"
              placeholder="*"
            >
            <input
              type="text"
              class="text-center rounded-md border-gray-400 w-11 h-11"
              maxLength="1"
              min="0"
              max="9"
              pattern="[0-9]"
              placeholder="*"
            >
            <input
              type="text"
              class="text-center rounded-md border-gray-400 w-11 h-11"
              maxLength="1"
              min="0"
              max="9"
              pattern="[0-9]"
              placeholder="*"
            >
            <input
              type="text"
              class="text-center rounded-md border-gray-400 w-11 h-11"
              maxLength="1"
              min="0"
              max="9"
              pattern="[0-9]"
              placeholder="*"
            >
            <input
              type="text"
              class="text-center rounded-md border-gray-400 w-11 h-11"
              maxLength="1"
              min="0"
              max="9"
              pattern="[0-9]"
              placeholder="*"
            >
          </div>
        </div>
        <p :class="[timer === 'on' ? '' : 'hidden']" class="text-sm text-gray-500 mb-2">
          Kodni
          <countdown
            v-if="timer === 'on'"
            class="text-light-orange"
            :end-time="new Date().getTime() + 300000"
            @finish="onCountdownEnd"
          >
            <template #process="scope">
              <span class="ml-1">{{ scope.timeObj.m }} : {{ scope.timeObj.s }}</span>
            </template>
          </countdown>
          daqiqadan so'ng qaytadan yuborish mumkin
        </p>
        <p :class="[timer === 'on' ? 'hidden' : '']" class="text-sm text-gray-500 mb-3">
          Kodni qaytadan yuborishingiz mumkin
        </p>
        <div class="bg-gray-400 rounded-md flex justify-center">
          <button class="text-white text-base p-2 focus:outline-none" @click="activetab = '5'">
            Tiklash kodini tasdiqlash
          </button>
        </div>
        <div class="flex justify-center mt-3">
          <p class="text-gray-600 text-sm">
            Kod kelmadimi?
          </p>
          <button :class="[timer === 'on' ? '' : 'text-light-orange']" class="text-gray-400 text-sm ml-1 focus:outline-none">
            Qaytadan yuborish
          </button>
        </div>
      </div>

      <!-- New Password -->

      <div v-if="activetab === '5'">
        <div>
          <div class="mt-3">
            <div>
              <p class="text-gray-500 text-sm">
                Yangi parol kamida 8 ta belgidan ( harf va sonlardan )
                iborat bo'lishi lozim.
              </p>
              <p class="text-gray-500 text-sm mt-1">
                Parol tiklashda muommolaringiz bormi? <span class="text-green-600 ml-1 border-b border-green-600">Yordam</span>
              </p>
            </div>

            <div class="my-6 space-y-3">
              <input
                name="password"
                type="text"
                autocomplete="text"
                placeholder="Yangi parol"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
              <input
                name="password"
                type="text"
                autocomplete="text"
                placeholder="Yangi parolni qaytadan kiriting"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
              >
            </div>
            <div class="bg-gray-400 rounded-md flex justify-center">
              <button class="text-white text-base p-2 focus:outline-none" @click="activetab = '6'">
                Parolni yangilash
              </button>
            </div>
          </div>
          <div class="flex justify-between mt-3">
            <div>
              <button class="text-light-orange text-sm focus:outline-none" @click="activetab = '1'">
                Kirish
              </button>
            </div>
            <div class="flex items-center">
              <p class="text-sm text-gray-600">
                Akkauntingiz yo'qmi?
              </p>
              <button class="text-green-600 ml-2 focus:outline-none text-sm" @click="activetab = '2'">
                A'zo bo'lish
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Success modal -->

      <div v-if="activetab === '6'">
        <div class=" items-center">
          <div class="flex justify-center my-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" fill="none" viewBox="0 0 108 108">
              <path stroke="#10B981" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" d="M40.5 54l9 9 18-18m27 9c0 22.368-18.132 40.5-40.5 40.5-22.367 0-40.5-18.132-40.5-40.5 0-22.367 18.133-40.5 40.5-40.5 22.368 0 40.5 18.133 40.5 40.5z" />
            </svg>
          </div>
          <div class="my-4 flex justify-center">
            <p class="text-gray-500 text-sm">
              Tabriklaymiz parolingiz muvaffaqiyatli tiklandi!
            </p>
          </div>
          <div>
            <button class="text-white bg-green-600 text-base focus:outline-none p-2 rounded-md w-full" @click="onClose('canceled')">
              Davom etish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Socials from '~/components/core/Socials.vue'

export default {
  name: 'SignIn',
  components: {
    Socials
  },
  data () {
    return {
      activetab: '1',
      timer: 'on',
      phone: '',
      password: ''
    }
  },
  methods: {
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('signin', e)
    },
    onCountdownEnd () {
      this.timer = 'off'
    }
  }
}
</script>
