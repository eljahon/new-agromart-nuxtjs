<template>
  <div class="">
    <div class="float-right text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer" @click="onClose('canceled')">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(75, 85, 99, 1);transform:;-ms-filter:">
        <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
      </svg>
    </div>
    <div class="py-8 px-3 sm:px-10">
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
</template>
<script>
export default {
  methods: {
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('success', e)
    }
  }
}
</script>
