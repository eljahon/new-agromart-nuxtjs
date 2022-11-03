/* eslint-disable no-console */
import Vue from 'vue'
import store from 'vuex'
export const state = () => ({
  uploading: {
    show: false,
    percent: 0
  }
})
export const mutations = {
  SET_UPLOADING (state, payload) {
    state.uploading = payload
  }
}
export const actions = {
  async uploadFile ({ commit }, payload) {
    const token = localStorage.getItem('local')
    console.log(token);
    const res = await this.$axios({
      method: 'post',
      url: `${process.env.VUE_APP_IMG_URL}upload`,
      data: payload,
      authorization: token,
    })
    // const res = await this.$axios.$post('/upload', payload)
    return res
  },
  async deleteMedia ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$remove(`/media/${payload}/`)
      Vue.prototype.$snotify.error('Media Deleted Successfully')
    } catch (e) {
      console.error(e)
    }
  },
  uploadingAction ({ commit }, payload) {
    commit('SET_UPLOADING', payload)
  }
}
export const getters = {
  uploading: state => state.uploading
}
