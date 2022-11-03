import Vue from 'vue'
export const state = () => ({})
export const mutations = {}
export const actions = {
  errorAlert (msg) {
    if (msg.detail) { Vue.prototype.$snotify.error(msg.detail) } else { Vue.prototype.$snotify.error(msg) }
  }
}
export const getters = {}
