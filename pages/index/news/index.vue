<template>
  <div class="max-w-7xl mx-auto">
    <div class="pb-6 flex justify-between sm:px-0">
      <breadcrumbs :items="items" />
    </div>
    <div class="md:hidden mb-6 grid grid-cols-1">
      <div>
        <button
          class="
          border
          flex
          items-center
          py-2
          w-full
          justify-center
          rounded-md
          bg-gray-100
          font-medium
          text-gray-700
          border-transparent
        "
          @click="openCategories()"
        >
          {{ $t('text.allSections') }}
        </button>
        <slideout-panel />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <!-- Vertical menu for mobile and desktop -->
      <div class="lg:block hidden">
        <sidebar :name="'news'" />
      </div>
      <div class="lg:col-span-3 col-span-4">
        <main class="flex-1 relative focus:outline-none">
          <news />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/core/Sidebar.vue'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
import News from '~/components/lists/news.vue'
import mobileCategory from '~/components/MobileCategory.vue'
export default {
  auth: false,
  components: {
    Sidebar,
    Breadcrumbs,
    News
  },
  data () {
    return {
      // news,
      items: [
        { text: 'text.lastNews', link: '/news', disabled: true }
      ],
      categories: []
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.fetchNewsCategories()
  },
  methods: {
    fetchNewsCategories () {
      this.$store.dispatch('crud/news/category/getNewsCategory').then((res) => {
        this.categories = res;
        this.categories.forEach((category) => {
          if (category.children) {
            category.children.forEach((child) => {
              child.current = false
            })
          }
          category.current = false
        })
        this.$store.dispatch('sidebar/setSidebar', this.categories)
      })
    },
    openCategories () {
      this.$showPanel({
        component: mobileCategory,
        openOn: 'right',
        props: {
          name: 'news'
        },
        width: (window.innerWidth * 3) / 4
      })
    }
  }
}
</script>
