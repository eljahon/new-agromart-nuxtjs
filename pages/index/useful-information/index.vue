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
        <sidebar :name="'useful-information'" />
      </div>
      <div class="lg:col-span-3 col-span-4">
        <main class="flex-1 relative overflow-y-auto focus:outline-none">
          <useful-information />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import UsefulInformation from '~/components/lists/useful-information.vue'
import Sidebar from '~/components/core/Sidebar.vue'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
import mobileCategory from '~/components/MobileCategory.vue'
export default {
  auth: false,
  components: { Sidebar, Breadcrumbs, UsefulInformation },
  data () {
    return {

      showMenuInMobile: false,
      locale: this.$i18n.locale,
      items: [
        { text: 'text.usefulInformation', link: '/useful-information', disabled: false }
      ],
      categories: []
    }
  },
  mounted () {
    this.fetchConsultationCategories()
  },
  methods: {
    fetchConsultationCategories () {
      this.$store.dispatch('crud/consultation/category/getCategoryConsultation').then((res) => {
        this.categories = res
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
          name: 'useful-information'
        },
        width: (window.innerWidth * 3) / 4
      })
    }
  }
}
</script>
