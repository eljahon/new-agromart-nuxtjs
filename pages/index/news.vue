<template>
  <div>
    <div class="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
// import Sidebar from '~/components/core/Sidebar.vue'

export default
{
  auth: false,
  // components: { Sidebar },
  data () {
    return {
      showMenuInMobile: false,
      locale: this.$i18n.locale
    }
  }

}
</script>
