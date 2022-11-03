<template>
  <div class="">
    <div class="float-right text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer" @click="onClose('canceled')">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(75, 85, 99, 1);transform:;-ms-filter:">
        <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
      </svg>
    </div>
    <div class="py-8 px-3 sm:px-10">
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
            <button class="text-white text-base p-2 focus:outline-none" @click="openSuccess()">
              Parolni yangilash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import successModal from '~/modals/success'
export default {
  name: 'NewPassword',
  methods: {
    openSuccess () {
      this.$emit('close')
      this.$modal.show(
        successModal,
        { status: 'success' },
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
      this.$root.$emit('new-password', e)
    }
  }
}
</script>
