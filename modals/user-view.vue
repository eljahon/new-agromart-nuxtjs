<template>
  <div class="flex items-center justify-center pt-14">
    <div class="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700" style="max-width: 600px">
      <div class="w-full pt-1 pb-5">
        <div class="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
          <img :src="user.image" alt="My profile" class="rounded-full order-1">
        </div>
      </div>
      <div class="mb-3">
        <label class="font-bold text-sm mb-2 ml-1">Name</label>
        <div>
          <input v-model="person.name" :disabled="true" class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-300 transition-colors">
        </div>
      </div>
      <div class="mb-3">
        <label class="font-bold text-sm mb-2 ml-1">Card number</label>
        <div>
          <input class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-300 transition-colors" type="text">
        </div>
      </div>
      <div class="mb-3 -mx-2 flex items-end">
        <div class="px-2 w-1/2">
          <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
          <div>
            <select class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-300 transition-colors cursor-pointer">
              <option value="01">
                01 - January
              </option>
              <option value="02">
                02 - February
              </option>
              <option value="03">
                03 - March
              </option>
              <option value="04">
                04 - April
              </option>
              <option value="05">
                05 - May
              </option>
              <option value="06">
                06 - June
              </option>
              <option value="07">
                07 - July
              </option>
              <option value="08">
                08 - August
              </option>
              <option value="09">
                09 - September
              </option>
              <option value="10">
                10 - October
              </option>
              <option value="11">
                11 - November
              </option>
              <option value="12">
                12 - December
              </option>
            </select>
          </div>
        </div>
        <div class="px-2 w-1/2">
          <select class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-300 transition-colors cursor-pointer">
            <option value="2020">
              2020
            </option>
            <option value="2021">
              2021
            </option>
            <option value="2022">
              2022
            </option>
            <option value="2023">
              2023
            </option>
            <option value="2024">
              2024
            </option>
            <option value="2025">
              2025
            </option>
            <option value="2026">
              2026
            </option>
            <option value="2027">
              2027
            </option>
            <option value="2028">
              2028
            </option>
            <option value="2029">
              2029
            </option>
          </select>
        </div>
      </div>
      <div class="mb-10">
        <label class="font-bold text-sm mb-2 ml-1">Security code</label>
        <div>
          <input class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text">
        </div>
      </div>
      <div>
        <button class="block w-full max-w-xs mx-auto bg-gray-600 hover:bg-gray-500 focus:bg-gray-700 text-white rounded-lg px-3 py-3 font-semibold" @click="onClose">
          CLOSE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    user: Object
  },

  data () {
    return {
      person: {}
    }
  },

  watch: {},

  created () {
    this.person = this.user
  },
  methods: {
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('user-view-modal', e)
    }
  }
}
</script>
<style scoped>
</style>
