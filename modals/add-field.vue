<template>
  <div class="relative p-3">
    <div class="text-lg text-gray-700 pb-2">
      {{ $t('text.landName') }}
    </div>
    <div class="absolute right-2 top-2 text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer" @click="onClose('canceled')">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(75, 85, 99, 1);transform:;-ms-filter:">
        <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
      </svg>
    </div>
    <label for="field" class="text-sm text-gray-700">{{ $t('text.enterLandName') }}</label>
    <div class="mt-1">
      <input
        name="text"
        type="text"
        autocomplete="text"
        :placeholder="$t('text.myLand')"
        required
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-900 sm:text-sm"
      >
    </div>
    <div class="grid grid-cols-2 gap-2 mt-4">
      <button class="text-gray-700 text-sm border rounded-md py-2" @click="onClose('canceled')">
        {{ $t('word.cancel') }}
      </button>
      <button class="text-green-800 bg-green-50 text-sm border-transparent rounded-md py-2">
        {{ $t('word.save') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('sign-in', e)
    }
  }
}
</script>
