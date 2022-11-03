<template>
  <div class="max-w-7xl mx-auto py-6 px-4 lg:px-8">
    <main class="flex-1 relative overflow-y-auto focus:outline-none">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  auth: false,
  data () {
    return {

    }
  }
}
</script>
