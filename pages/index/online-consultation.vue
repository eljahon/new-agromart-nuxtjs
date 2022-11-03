<template>
  <div>
    <main class="flex-1 relative overflow-y-auto focus:outline-none">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  auth: false,
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      query: 'query/getQuery'
    })
  }
}
</script>
