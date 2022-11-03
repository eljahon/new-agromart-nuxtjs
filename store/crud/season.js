export const state = () => ({
  loading: false,
  oneLoading: false,
  pending: false,
  deleting: false,
  error: null,
  data: [],
  pagination: {
    page: 1,
    total: 0
  }
})
export const mutations = {
  'ERROR_SEASONS' (state, payload) { state.error = payload },
  'GET_SEASONS' (state, payload) { state.data = payload },
  'LOAD_SEASONS' (state, payload) { state.loading = payload },
  'ONE_LOAD_SEASONS' (state, payload) { state.oneLoading = payload },
  'PENDING_SEASONS' (state, payload) { state.pending = payload },
  'DELETING_SEASONS' (state, payload) { state.deleting = payload },
  'PAGINATION_SEASONS' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getSeasons ({ commit }, payload) {
    commit('LOAD_SEASONS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/seasons', { params: payload }).then((res) => {
        commit('GET_SEASONS', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEASONS', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_SEASONS', false)
      })
    })
  },

  // get id
  getSeasonsById ({ commit }, payload) {
    commit('ONE_LOAD_SEASONS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/seasons/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEASONS', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_SEASONS', false)
      })
    })
  },

  // post
  postSeasons ({ commit }, payload) {
    commit('PENDING_SEASONS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/seasons', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEASONS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_SEASONS', false)
      })
    })
  },

  // update
  updateSeasons ({ commit }, payload) {
    commit('PENDING_SEASONS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/seasons/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEASONS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_SEASONS', false)
      })
    })
  },

  // delete
  deleteSeasons ({ commit }, payload) {
    commit('DELETING_SEASONS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$delete(`/seasons/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEASONS', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_SEASONS', false)
      })
    })
  }
}
export const getters = {
  loadSeasons (state) { return state.loading },
  oneLoadSeasons (state) { return state.oneLoading },
  pendingSeasons (state) { return state.pending },
  deletingSeasons (state) { return state.deleting },
  dataSeasons (state) { return state.data },
  errorSeasons (state) { return state.error },
  paginationSeasons (state) { return state.pagination }
}
