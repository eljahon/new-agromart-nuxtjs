<template>
  <!-- <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> -->
  <div>
    <main class="flex-1 relative overflow-y-auto focus:outline-none">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
export default {
  auth: false,
  // components: { Breadcrumbs },
  data () {
    return {
      items: [
        { text: 'Savdo maydonchasi', link: '/trading', disabled: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      query: 'query/getQuery'
    })
  }
}
</script>
