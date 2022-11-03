<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 lg:py-6 pb-6 md:flex block space-y-3 justify-between gap-6 sm:px-0">
      <breadcrumbs :items="items" />
      <!-- <div class="md:flex hidden justify-end">
        <button
          type="button"
          class="
              inline-flex
              items-center
              px-4
              py-2
              border border-transparent
              shadow-sm
              text-base
              font-medium
              rounded-md
              text-white
              bg-light-orange
              focus:outline-none
            "
          @click="newConsultation()"
        >
          {{ $t('text.newConsultation') }} <span class="ml-2">+</span>
        </button>
      </div> -->
      <div class="md:hidden grid grid-cols-1 gap-2">
        <button class="text-light-orange py-2 bg-white col-span-6 font-medium shadow-sm rounded-md">
          {{ $t('word.myConsultation') }}
        </button>
        <!-- <button class="bg-light-orange text-3xl w-11 h-11 flex justify-center text-white rounded-md">
          +
        </button> -->
      </div>
      <div class="md:hidden gap-4 grid grid-cols-2 mt-4">
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
    </div>

    <div class="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4">
      <div class="lg:block hidden">
        <sidebar :name="'online-consultation'" />
      </div>
      <div class="xl:col-span-3 col-span-2 ">
        <main class="flex-1 relative focus:outline-none">
          <online-consultation />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/core/Sidebar.vue'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
import NewConsultation from '~/modals/new-consultation.vue'
import mobileCategory from '~/components/MobileCategory.vue'
import OnlineConsultation from '~/components/lists/online-consultation.vue'
export default {
  auth: false,
  components: {
    Sidebar,
    Breadcrumbs,
    OnlineConsultation
  },
  data () {
    return {
      showMenuInMobile: false,
      locale: this.$i18n.locale,
      categories: [],
      consultants: [],
      items: [
        { text: 'text.onlineConsultation', link: '/online-consultation', disabled: false }
      ]
    }
  },
  mounted () {
    this.fetchConsultationCategories()
  },
  methods: {
    newConsultation () {
      this.$modal.show(
        NewConsultation,
        { status: 'new-consultation' },
        {
          height: '600',
          maxWidth: 400,
          width: window.innerWidth <= 400 ? window.innerWidth - 10 : 400,
          scrollable: true
        }
      )
    },
    fetchConsultationCategories () {
      this.$store.dispatch('crud/consultation/category/getCategoryConsultation').then((res) => {
        this.categories = res
        this.categories.forEach((category) => {
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
          name: 'online-consultation'
        },
        width: (window.innerWidth * 3) / 4
      })
    }
  }
}
</script>
