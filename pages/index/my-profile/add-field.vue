<template>
  <div class="grid grid-cols-3 rounded-sm gap-0 h-full">
    <div class="col-span-2 relative">
      <div id="map-wrap" class="relative" style="height: 100vh">
        <client-only>
          <l-map :zoom="13" :center="[55.9464418,8.1277591]">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            <l-marker :lat-lng="[55.9464418,8.1277591]" />
          </l-map>
        </client-only>
      </div>
      <div class="absolute top-4 left-4">
        <div class="mt-1 flex items-center relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <!-- Heroicon name: solid/mail -->
            <i class="bx bx-search text-base text-gray-500" />
          </div>
          <input id="email" type="email" name="email" class=" block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Yeringiz manzili">
        </div>
      </div>
    </div>
    <div class="relative bg-white shadow-sm">
      <p class="text-gray-700 text-lg border-b p-3 font-medium">
        Yangi yer qo'shish
      </p>
      <div class="m-3 border rounded-sm shadow-sm">
        <div class="grid grid-cols-5">
          <div class="border-r" />
          <div class="col-span-4 flex items-center justify-between p-2">
            <div class="block">
              <div class="text-gray-700 font-normal text-lg">
                Mening yerim 1
              </div>
              <div class="text-gray-500 text-sm">
                23.7 Ge
              </div>
            </div>
            <i class="bx bx-trash text-xl text-red-500" />
          </div>
        </div>
      </div>
      <div class="absolute bottom-3 inset-x-3">
        <div class="grid grid-cols-2 gap-2">
          <button class="text-gray-700 text-sm border rounded-md py-2">
            Bekor qilish
          </button>
          <button class="text-white bg-light-orange text-sm border rounded-md py-2" @click="toAddField()">
            Yerni saqlash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addField from '~/modals/add-field.vue'
export default {
  name: 'AddField',
  methods: {
    toAddField () {
      this.$emit('close')
      this.$modal.show(
        addField,
        { status: 'add-field' },
        {
          height: 'auto',
          maxWidth: 300,
          width: window.innerWidth <= 300 ? window.innerWidth - 10 : 300,
          acrollable: true
        }
      )
    }
  }
}
</script>
