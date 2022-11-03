<template>
  <div class="p-4">
    <div class="flex items-center pb-6 justify-between">
      <div class="text-gray-700 text-lg font-medium">
        {{ season.id ? $t('text.editSeason') : $t('text.addSeason') }}
      </div>
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
    </div>
    <!-- <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
      <form class="" @submit.prevent="passes(onSubmit)"> -->
    <div class="grid grid-cols-2 gap-2 pb-3">
      <div class="block">
        <p class="text-sm text-gray-700 font-medium">
          {{ $t('text.cropName') }}
        </p>
        <select
          v-model.trim="$v.season.crop_id.$model"
          class="rounded-md border border-gray-300 mt-1 w-full"
        >
          <option
            v-for="(el, index) in crops"
            :key="index"
            class="text-sm text-gray-600 font-normal w-36"
            :value="el.id"
          >
            {{ el.name }}
          </option>
        </select>
        <p class="text-red-500 text-xs italic">
          <span v-if="!$v.season.crop_id.required">Required</span>
        </p>
      </div>
      <div class="block">
        <p class="text-sm text-gray-700 font-medium">
          {{ $t('text.seasonYear') }}
        </p>
        <date-picker
          v-model.trim="$v.season.year.$model"
          :placeholder="$t('text.selectYear')"
          type="year"
          format="YYYY"
          input-class="rounded-md border border-gray-300 mt-1 w-full"
        />
        <p class="text-red-500 text-xs italic">
          <span v-if="!$v.season.year.required">Required</span>
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 pb-3">
      <div class="block">
        <div class="text-sm text-gray-700 font-medium">
          {{ $t('text.timeOfSowing') }}
        </div>
        <date-picker
          v-model.trim="$v.season.planteddate.$model"
          format="DD-MM-YYYY"
          input-class="rounded-md border border-gray-300 mt-1 w-full"
        />
        <p class="text-red-500 text-xs italic">
          <span v-if="!$v.season.planteddate.required">Required</span>
        </p>
      </div>
      <div class="block">
        <p class="text-sm text-gray-700 font-medium">
          {{ $t('text.harvestTime') }}
        </p>
        <date-picker
          v-model.trim="$v.season.harvesteddate.$model"
          format="DD-MM-YYYY"
          input-class="rounded-md border border-gray-300 mt-1 w-full"
        />
        <p class="text-red-500 text-xs italic">
          <span v-if="!$v.season.harvesteddate.required">Required</span>
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 pb-3">
      <div class="block">
        <p class="text-sm text-gray-700 font-medium">
          {{ $t('text.expectedVolume') }}
        </p>
        <input v-model="season.expacted_harvest" type="number" min="0" class="rounded-md border border-gray-300 mt-1 w-full">
      </div>
      <div class="block">
        <p class="text-sm text-gray-700 font-medium">
          {{ $t('text.yieldVolume') }}
        </p>
        <input v-model="season.harvested_amount" type="number" min="0" class="rounded-md border border-gray-300 mt-1 w-full">
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 pb-3">
      <div>
        <p class="text-sm text-gray-700 font-medium">
          {{ $t('word.description') }}
        </p>
        <textarea
          v-model="season.description"
          cols="3"
          placeholder="Comment..."
          class="rounded-md border border-gray-300 mt-1 w-full"
        />
      </div>
    </div>
    <div class="col-start-2 mt-4 flex justify-end space-x-5">
      <button class="text-gray-700 font-medium bg-white border rounded-md py-1.5 px-3" @click="onClose()">
        {{ $t('word.cancel') }}
      </button>
      <button
        class="font-medium border rounded-md py-1.5 px-4"
        :class="$v.$invalid ? 'text-gray-600 bg-gray-100' : 'text-green-800 bg-green-100'"
        @click="onSubmit()"
      >
        {{ season.id ? $t('word.edit') : $t('word.add') }}
      </button>
    </div>
    <!-- </form>
    </ValidationObserver> -->
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  props: {
    field: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      season: {
        crop_id: null,
        year: null,
        planteddate: null,
        harvesteddate: null,
        expacted_harvest: null,
        harvested_amount: null,
        description: '',
        field_id: this.field.id
      },
      crops: []
    }
  },
  validations: {
    season: {
      crop_id: { required },
      year: { required },
      planteddate: { required },
      harvesteddate: { required }
    }
  },
  mounted () {
    this.fetchData()
    if (this.data.id) {
      this.season = this.data
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.season.year = `${this.season.year.getFullYear()}`
        this.$store
          .dispatch(
            this.season.id ? 'crud/season/updateSeasons' : 'crud/season/postSeasons',
            {
              id: this.season.id,
              data: this.season
            }
          )
          .then((res) => {
            if (this.season.id) {
              this.$snotify.warning('Updated season')
            } else {
              this.$snotify.success('Added new season')
            }
            this.onClose()
          })
          .catch((error) => {
            this.$snotify.error(error)
          })
      }
    },
    async fetchData () {
      await this.$store.dispatch('crud/crop/getCrops').then((res) => {
        this.crops = res
      })
    },
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('season-modal', e)
    }
  }
}
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
