<template>
  <div class="gap-x-2 bg-white rounded-md hover:shadow-lg border shadow-md w-full">
    <div class="h-48 object-cover relative overflow-hidden">
      <router-link :to="{path: localePath('/')}">
        <img
          class="w-full h-60  object-cover shadow-lg rounded-md rounded-b-none"
          src="https://www.e-fresco.io/pub/media/catalog/product/c/a/carrots_1.jpg"
        >
        <p v-if="item.type.name === 'Sotish'" class="text-green-800 bg-green-50 text-xs px-2 py-1 text-center rounded-xl w-16 absolute bottom-2 left-2">
          {{ item.type.name }}
        </p>
        <p v-else class="text-light-orange bg-orange-50 text-xs px-2 py-1 text-center rounded-xl w-20 absolute bottom-2 left-2">
          {{ item.type.name }}
        </p>
      </router-link>
    </div>
    <div class="p-3">
      <h3 class="text-gray-600 font-medium text-base">
        {{ item.title }}
      </h3>
      <!-- <p class="text-sm my-2 text-green-600">
                    {{ product.position }}
                  </p> -->
      <div class="grid grid-cols-1 justify-between mr-3">
        <div class="flex gap-2 items-center font-medium mt-3">
          <p v-if="item.type.name === 'Sotish'" class="text-green-600 text-base text-right">
            {{ item.price }}
          </p>
          <p v-else class="text-light-orange text-base text-right">
            {{ item.price }}
          </p>
          <p class="text-gray-500 text-xs">
            {{ item.unit }}
          </p>
        </div>
        <div class="flex items-end justify-between mt-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 object-cover overflow-hidden rounded-full">
              <img src="https://picsum.photos/50/50" alt="Avatar">
            </div>
            <div>
              <h4 class="text-sm text-gray-600 font-normal">
                {{ item.author }}
              </h4>
              <span class="text-xs text-gray-400 font-normal">{{ item.created_at }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
              <path stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" d="M7.5 6c0 .828-.672 1.5-1.5 1.5-.829 0-1.5-.672-1.5-1.5S5.17 4.5 6 4.5c.828 0 1.5.672 1.5 1.5z" />
              <path stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" d="M1.229 6C1.866 3.971 3.761 2.5 6 2.5s4.134 1.471 4.771 3.5c-.637 2.029-2.532 3.5-4.77 3.5-2.24 0-4.135-1.471-4.772-3.5z" />
            </svg>
            <span class="text-xs text-gray-500">{{ item.views }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProductCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    product: Object
  }
}
</script>
