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
  'ERROR_REGION' (state, payload) { state.error = payload },
  'GET_REGION' (state, payload) { state.data = payload },
  'LOAD_REGION' (state, payload) { state.loading = payload },
  'ONE_LOAD_REGION' (state, payload) { state.oneLoading = payload },
  'PENDING_REGION' (state, payload) { state.pending = payload },
  'DELETING_REGION' (state, payload) { state.deleting = payload },
  'PAGINATION_REGION' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getRegion ({ commit }, payload) {
    commit('LOAD_REGION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/regions', { params: payload }).then((res) => {
        commit('GET_REGION', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_REGION', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_REGION', false)
      })
    })
  },

  // get id
  getRegionById ({ commit }, payload) {
    commit('ONE_LOAD_REGION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/regions/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_REGION', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_REGION', false)
      })
    })
  },

  // post
  postRegion ({ commit }, payload) {
    commit('PENDING_REGION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/regions', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_REGION', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_REGION', false)
      })
    })
  },

  // update
  updateRegion ({ commit }, payload) {
    commit('PENDING_REGION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/regions/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_REGION', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_REGION', false)
      })
    })
  },

  // delete
  deleteRegion ({ commit }, payload) {
    commit('DELETING_REGION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/regions/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_REGION', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_REGION', false)
      })
    })
  }
}
export const getters = {
  loadRegion (state) { return state.loading },
  oneLoadRegion (state) { return state.oneLoading },
  pendingRegion (state) { return state.pending },
  deletingRegion (state) { return state.deleting },
  dataRegion (state) { return state.data },
  errorRegion (state) { return state.error },
  paginationRegion (state) { return state.pagination }
}
