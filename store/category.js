export const state = () => ({
  category: []
})
export const mutations = {
  SET_CATEGORY (state, payload) {
    state.category = payload
  },
  CHANGE_CATEGORY (state, payload) {
    state.category = payload
  }
}
export const actions = {
  setCategory ({ commit }, data) {
    commit('SET_SIDEBAR', data)
  },
  changeCategory ({ commit }, data) {
    commit('CHANGE_SIDEBAR', data)
  }
}
export const getters = {
  getCategory (state) { return state.category }
}
