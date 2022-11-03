<template>
  <div class="relative p-3">
    <div class="text-lg text-gray-700 pb-2">
      {{ $t('text.landName') }}
    </div>
    <div
      class="absolute right-2 top-2 text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer"
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
    <div class="mt-1">
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form class="" @submit.prevent="passes(onSubmit)">
          <ValidationProvider
            v-slot="{ errors }"
            name="name"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="name" class="text-gray-700 font-medium text-base">
              {{ $t('text.landName') }}*
            </label>
            <input
              v-model="land.name"
              :class="
                errors.length > 0
                  ? 'border-red-400'
                  : land.name
                    ? 'border-green-600'
                    : 'border-gray-300'
              "
              type="text"
              name="name"
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
            >
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Description"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="description" class="text-gray-700 font-medium text-base">
              {{ $t('word.description') }}*
            </label>
            <textarea
              v-model="land.description"
              cols="3"
              :class="
                errors.length > 0
                  ? 'border-red-400'
                  : land.description
                    ? 'border-green-600'
                    : 'border-gray-300'
              "
              name="description"
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Hectare"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="hectare" class="text-gray-700 font-medium text-base">
              {{ $t('word.hectare') }}*
            </label>
            <input
              v-model="land.hectare"
              :class="
                errors.length > 0
                  ? 'border-red-400'
                  : land.hectare
                    ? 'border-green-600'
                    : 'border-gray-300'
              "
              type="text"
              name="hectare"
              readonly
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
            >
          </ValidationProvider>
          <div
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="group_name" class="text-gray-700 font-medium text-base">
              {{ $t('text.groupName') }}*
            </label>
            <input
              v-model="land.group_name"
              type="text"
              name="group_name"
              class="md:col-span-2 border-gray-300 lg:mt-0 mt-3 text-sm rounded-md"
            >
          </div>
          <div
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="company" class="text-gray-700 font-medium text-base">
              {{ $t('word.company') }}*
            </label>
            <select
              v-model="land.company_id"
              class="text-sm text-gray-500 border-gray-500 font-normal md:col-span-2 w-full rounded-md h-9"
            >
              <option
                v-for="(company, index) in companies"
                :key="index"
                class="text-sm text-gray-600 font-normal"
                :value="company.id"
              >
                {{ company.name }}
              </option>
            </select>
          </div>
          <button
            type="submit"
            :disabled="invalid"
            :class="
              invalid
                ? 'bg-gray-100 text-gray-500 w-full rounded-md py-2 mt-2'
                : 'bg-light-orange w-full rounded-md text-white py-2 mt-2'
            "
          >
            {{ $t('word.save') }}
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      land: {
        name: '',
        description: '',
        group_name: '',
        hectare: '',
        company_id: null,
        imagePath: '',
        polygon: {},
        user: JSON.parse(localStorage.getItem("user_info")).id
      },
      isMultiselectOpened: false,
      companies: [],
    }
  },
  mounted () {
    this.land.hectare = this.data.area
    this.land.polygon = this.data.polygon
    this.fetchData()
  },
  methods: {
    handleFocusOut () {
      console.log('Handle focus out')
    },
    handleFocus () {
      console.log('Handle focus')
    },
    async onSubmit () {
      await this.$store.dispatch('crud/field/postFields', { data: this.land }).then((res) => {
        this.$router.push(
          { path: this.localePath(`/my-profile/lands/${res.id}`) }
        )
        this.onClose()
      })
    },
    hideDropdownButton () {
      this.isMultiselectOpened = false
    },
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('land', e)
    },
    async fetchData () {
      await this.$store.dispatch('crud/company/getCompanies').then((res) => {
        this.companies = res
      })
    }
  }
}
</script>
