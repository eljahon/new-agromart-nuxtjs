<template>
  <div class="">
    <vue-snotify />
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import telegramModal from '~/modals/telegram'
export default {
  components: {},
  data () {
    return {
      token: null,
      currentUser: {}
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.loggedIn
    })
  },
  created () {
    if (!process.client) {
      return
    }
    this.token = localStorage.getItem('local')
    this.currentUser = JSON.parse(localStorage.getItem('user_info'))
  },
  mounted () {
    this.setUserToStore()
    this.openTelegramModal()
  },
  methods: {
    // eslint-disable-next-line require-await
    async setUserToStore () {
      if (this.token && Object.keys(this.currentUser).length > 0) {
        await this.$auth.setToken('local', this.token)
        await this.$axios.setHeader('Authorization', this.token)
        await this.$auth.ctx.app.$axios.setHeader('Authorization', this.token)
        await this.$auth.setUser(this.currentUser)
      }
    },
    openTelegramModal () {
      this.$modal.show(
        telegramModal,
        { status: 'telegram' },
        {
          height: 'auto',
          maxWidth: 500,
          width: window.innerWidth <= 450 ? window.innerWidth - 10 : 450,
          scrollable: false
        }
      )
      this.$root.$once('telegram-modal', (item) => {
        // this.fetchSeason()
      })
    }
  }
}
</script>

<style></style>
