<template>
  <div class="p-4">
    <div
      class="float-right text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer"
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
    <div class="text-gray-600 font-semibold pb-4 text-xl">
      {{ $t('word.filter') }}
    </div>
    <div class="text-gray-700 text-sm font-medium pb-3">
      {{ $t('text.adType') }}
    </div>
    <select class="form-select text-sm w-full border text-gray-900 py-2 mb-1 border-gray-300 rounded-md focus:outline-none focus:border-gray-300 transition-colors cursor-pointer">
      <option value="">
        Sotish
      </option>
      <option value="">
        Sotib olish
      </option>
    </select>
    <div class="text-gray-700 text-sm font-medium py-3">
      Kategoriyasi
    </div>
    <select class="form-select text-sm w-full border text-gray-900 py-2 mb-1 border-gray-300 rounded-md focus:outline-none focus:border-gray-300 transition-colors cursor-pointer">
      <option value="">
        Parranda
      </option>
      <option value="">
        Qoramol
      </option>
    </select>
    <select class="form-select text-sm w-full border text-gray-500 py-2 my-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-300 transition-colors cursor-pointer">
      <option value="man">
        Quyi kategoriya
      </option>
      <option value="woman">
        Sotib olish
      </option>
    </select>
    <div class="text-gray-700 text-sm font-medium py-3">
      {{ $t('word.price') }}
    </div>
    <input type="text" name="initial_price" :placeholder="$t('text.fromSum')" class="w-full text-sm rounded-md border-gray-300">
    <input type="text" name="final_price" :placeholder="$t('text.toSum')" class="my-3 w-full text-sm rounded-md border-gray-300">
    <div class="text-gray-700 text-sm font-medium py-3">
      {{ $t('text.deliveryParam') }}
    </div>
    <div class="block gap-3">
      <div class="flex items-center">
        <input id="pick_up" class="rounded" checked type="checkbox">
        <div class="">
          <label class="text-sm font-medium text-gray-700 ml-2">{{ $t('text.pickUp') }}</label>
        </div>
      </div>
      <div class="flex items-center my-3">
        <input id="delivery" class="rounded" type="checkbox">
        <div class="">
          <label class="text-sm font-medium text-gray-700 ml-2">{{ $t('word.delivery') }}</label>
        </div>
      </div>
      <button class="text-sm text-white font-medium bg-green-600 p-2 rounded-md w-full">
        {{ $t('word.show') }}
      </button>
      <button class="text-sm text-light-orange font-medium bg-orange-50 p-2 my-3 rounded-md w-full">
        {{ $t('text.cleanFilter') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  methods: {
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('sign-up', e)
    }
  }
}
</script>
