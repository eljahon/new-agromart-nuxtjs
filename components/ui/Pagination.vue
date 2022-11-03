<template>
  <nav
    class="
      border-t border-gray-200
      px-4
      flex
      items-center
      justify-between
      sm:px-0
    "
  >
    <div class="-mt-px w-0 flex-1 flex">
      <button
        class="
          pt-4
          pr-1
          inline-flex
          items-center
          text-sm
          font-medium
          text-gray-500
          focus:outline-none
        "
        :class="{
          'border-t-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
            Number(value) !== 1,
        }"
        :disabled="Number(value) === 1"
        @click="$emit('input', +value - 1)"
      >
        <svg
          class="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="hidden md:inline-block">Назад</span>
      </button>
    </div>
    <div class="md:-mt-px md:flex">
      <template v-if="section > 1">
        <button
          class="
            border-t-2
            pt-4
            px-3
            md:px-4
            inline-flex
            items-center
            text-sm
            font-medium
          "
          :class="
            Number(value) === 1
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          "
          @click="$emit('input', 1)"
        >
          1
        </button>
        <button
          class="
            border-transparent
            text-gray-500
            border-t-2
            pt-4
            px-3
            md:px-4
            inline-flex
            items-center
            text-sm
            font-medium
            focus:outline-none
          "
          @click="goBackwardSection"
        >
          ...
        </button>
      </template>
      <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
      <button
        v-for="(page, index) in pages"
        :key="index"
        class="
          border-t-2
          pt-4
          px-3
          md:px-4
          inline-flex
          items-center
          text-sm
          font-medium
          focus:outline-none
        "
        :class="
          page === Number(value)
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        "
        aria-current="page"
        @click="$emit('input', page)"
      >
        {{ page }}
      </button>
      <template v-if="section < sections">
        <button
          class="
            border-transparent
            text-gray-500
            border-t-2
            pt-4
            px-3
            md:px-4
            inline-flex
            items-center
            text-sm
            font-medium
            focus:outline-none
          "
          @click="goForwardSection"
        >
          ...
        </button>
        <button
          class="
            border-t-2
            pt-4
            px-3
            md:px-4
            inline-flex
            items-center
            text-sm
            font-medium
          "
          :class="
            Number(value) === length
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          "
          @click="$emit('input', length)"
        >
          {{ length }}
        </button>
      </template>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <button
        :disabled="Number(value) === length"
        class="
          pt-4
          pl-1
          inline-flex
          items-center
          text-sm
          font-medium
          text-gray-500
          focus:outline-none
        "
        :class="{
          'border-t-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
            Number(value) !== length,
        }"
        @click="$emit('input', +value + 1)"
      >
        <span class="hidden md:inline-block">След</span>
        <svg
          class="ml-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
import range from 'lodash.range'

export default {
  name: 'Pagination',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    totalVisible: {
      type: Number,
      default: 3
    }
  },
  data: () => ({
    currentOffset: 10,
    offsetList: [5, 10, 20, 50]
  }),
  computed: {
    sections () {
      return Math.ceil(this.length / this.totalVisible)
    },
    section () {
      return Math.ceil(this.value / this.totalVisible)
    },
    pages () {
      return range(
        (this.section - 1) * this.totalVisible + 1,
        this.lastPage + 1
      )
    },
    lastPage () {
      let last = (this.section - 1) * this.totalVisible + this.totalVisible

      if (this.section === this.sections) {
        last = this.length
      }

      return last
    }
  },
  methods: {
    goForwardSection () {
      this.$emit('input', this.firstPageOfSection(this.section + 1))
    },

    goBackwardSection () {
      this.$emit('input', this.lastPageOfSection(this.section - 1))
    },

    firstPageOfSection (section) {
      return (section - 1) * this.totalVisible + 1
    },

    lastPageOfSection (section) {
      return this.firstPageOfSection(section) + this.totalVisible - 1
    }
  }
}
</script>

<style scoped>
.page:focus {
  @apply outline-none;
}
</style>
