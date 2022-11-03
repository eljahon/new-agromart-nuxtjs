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
  'ERROR_PRICE' (state, payload) { state.error = payload },
  'GET_PRICE' (state, payload) { state.data = payload },
  'LOAD_PRICE' (state, payload) { state.loading = payload },
  'ONE_LOAD_PRICE' (state, payload) { state.oneLoading = payload },
  'PENDING_PRICE' (state, payload) { state.pending = payload },
  'DELETING_PRICE' (state, payload) { state.deleting = payload },
  'PAGINATION_PRICE' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getPrice ({ commit }, payload) {
    commit('LOAD_PRICE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/pricelists', { params: payload }).then((res) => {
        commit('GET_PRICE', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRICE', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_PRICE', false)
      })
    })
  },

  // get id
  getPriceById ({ commit }, payload) {
    commit('ONE_LOAD_PRICE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/pricelists/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRICE', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_PRICE', false)
      })
    })
  },

  // update
  updatePrice ({ commit }, payload) {
    commit('PENDING_PRICE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/pricelists/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRICE', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_PRICE', false)
      })
    })
  },

  // delete
  deletePrice ({ commit }, payload) {
    commit('DELETING_PRICE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/pricelists/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRICE', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_PRICE', false)
      })
    })
  },
  getPriceData ({ commit }, payload) {
    commit('LOAD_PRICE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/pricedates', { params: payload }).then((res) => {
        // commit('GET_PRICE', res)
        resolve(res)
      }).catch((error) => {
        // commit('ERROR_PRICE', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_PRICE', false)
      })
    })
  },
}

export const getters = {
  loadPrice (state) { return state.loading },
  oneLoadPrice (state) { return state.oneLoading },
  pendingPrice (state) { return state.pending },
  deletingPrice (state) { return state.deleting },
  dataPrice (state) { return state.data },
  errorPrice (state) { return state.error },
  paginationPrice (state) { return state.pagination }
}
