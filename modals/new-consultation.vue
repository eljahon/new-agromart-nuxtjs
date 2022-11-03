<template>
  <div class="relative h-full">
    <div class="flex items-center justify-between py-3 px-5">
      <div class="text-gray-600 text-2xl font-semibold">
        Yangi konsultatsiya
      </div>
      <button @click="onClose()">
        <i class="bx bx-x text-3xl hover:bg-gray-100 text-gray-600 rounded-md p-1" />
      </button>
    </div>
    <div class="grid grid-cols-2 gap-3 px-5 border-b-2 border-gray-300 pb-3">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          name="search"
          class="
                    bg-gray-100
                    focus:ring-green-600
                    focus:border-green-600
                    block
                    w-full
                    rounded
                    pl-10
                    sm:text-sm
                    border-transparent
                    py-2
                  "
          placeholder="Izlash"
        >
      </div>
      <div>
        <select class="form-select text-sm w-full border text-gray-900 py-2 mb-1 border-gray-300 rounded-md focus:outline-none focus:border-gray-300 transition-colors cursor-pointer">
          <option value="">
            Chorvachilik va veterenariya
          </option>
          <option value="">
            Poliz ekinlari va meva
          </option>
          <option value="">
            Sug'orish texnologiyalari
          </option>
          <option value="">
            Parandachilik
          </option>
        </select>
      </div>
    </div>
    <div class="h-4/6 relative overflow-y-auto scroll">
      <div v-for="(consultant, index) in newConsultation" :key="index" class="px-5 pt-2">
        <div class="border hover:bg-gray-100 cursor-pointer rounded-md border-gray-300 p-2">
          <div class="flex items-center">
            <img
              :src="consultant.img"
              class="rounded-full object-cover h-16 w-16"
            >
            <div class="block ml-4">
              <div class="text-gray-600 text-lg font-medium">
                {{ consultant.name }}
              </div>
              <div class="text-xs text-green-800 bg-green-100 rounded-full mt-1 px-3 py-1">
                {{ consultant.type }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute inset-x-5 bottom-3 border-t">
      <button class="text-white bg-green-600 rounded-md w-full flex justify-center py-2">
        Boshlash
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewConsultation',
  data () {
    return {
      newConsultation: [
        { name: 'Maftuna Narkulova', img: 'https://www.tailwind-kit.com/images/person/3.jpg', type: 'Chorvachilik va veterenariya' },
        { name: 'Maftuna Narkulova', img: 'https://www.tailwind-kit.com/images/person/3.jpg', type: 'Chorvachilik va veterenariya' },
        { name: 'Maftuna Narkulova', img: 'https://www.tailwind-kit.com/images/person/3.jpg', type: 'Chorvachilik va veterenariya' },
        { name: 'Maftuna Narkulova', img: 'https://www.tailwind-kit.com/images/person/3.jpg', type: 'Chorvachilik va veterenariya' },
        { name: 'Maftuna Narkulova', img: 'https://www.tailwind-kit.com/images/person/3.jpg', type: 'Chorvachilik va veterenariya' },
        { name: 'Maftuna Narkulova', img: 'https://www.tailwind-kit.com/images/person/3.jpg', type: 'Chorvachilik va veterenariya' },
        { name: 'Maftuna Narkulova', img: 'https://www.tailwind-kit.com/images/person/3.jpg', type: 'Chorvachilik va veterenariya' },
        { name: 'Maftuna Narkulova', img: 'https://www.tailwind-kit.com/images/person/3.jpg', type: 'Chorvachilik va veterenariya' }
      ]
    }
  },
  methods: {
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('new-consultation', e)
    }
  }
}
</script>

<style>
  .scroll::-webkit-scrollbar {
  @apply w-1;
}

.scroll::-webkit-scrollbar-track {
  @apply shadow;
}
 </style>
