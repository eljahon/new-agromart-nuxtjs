<template>
  <div class="">
    <div class="float-right text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer" @click="onClose('canceled')">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(75, 85, 99, 1);transform:;-ms-filter:">
        <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
      </svg>
    </div>
    <div class="py-8 px-3 sm:px-10">
      <div class="mt-3">
        <p class="text-gray-500 text-sm">
          +998 94 645 ** ** ga 5ta raqamdan iborat kod yuborildi. Iltimos kodni kiriting.
        </p>
        <p class="text-gray-500 text-sm mt-1">
          Parol tiklashda muommolaringiz bormi? <span class="text-green-600 ml-1 border-b border-green-600">Yordam</span>
        </p>
      </div>

      <div class="my-6 flex justify-center">
        <div>
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
      <p class="text-sm text-gray-500 mb-2">
        Kodni <span class="text-light-orange">3 : 00</span> daqiqadan so'ng qaytadan yuborish mumkin
      </p>
      <div class="bg-gray-400 rounded-md flex justify-center">
        <button class="text-white text-base p-2 focus:outline-none" @click="openNewPassword()">
          Tiklash kodini tasdiqlash
        </button>
      </div>
      <div class="flex justify-center mt-3">
        <p class="text-gray-600 text-sm">
          Kod kelmadimi?
        </p>
        <button class="text-gray-400 text-sm ml-1 focus:outline-none">
          Qaytadan yuborish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import newPasswordModal from '~/modals/new-password'
export default {
  name: 'ResetPassword',
  data () {
    return {}
  },
  methods: {
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
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('reset-password', e)
    }
  }
}
</script>
