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
  'ERROR_CROPS' (state, payload) { state.error = payload },
  'GET_CROPS' (state, payload) { state.data = payload },
  'LOAD_CROPS' (state, payload) { state.loading = payload },
  'ONE_LOAD_CROPS' (state, payload) { state.oneLoading = payload },
  'PENDING_CROPS' (state, payload) { state.pending = payload },
  'DELETING_CROPS' (state, payload) { state.deleting = payload },
  'PAGINATION_CROPS' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getCrops ({ commit }, payload) {
    commit('LOAD_CROPS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/crops', { params: payload }).then((res) => {
        commit('GET_CROPS', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CROPS', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_CROPS', false)
      })
    })
  },

  // get id
  getCropsById ({ commit }, payload) {
    commit('ONE_LOAD_CROPS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/crops/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CROPS', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_CROPS', false)
      })
    })
  },

  // post
  postCrops ({ commit }, payload) {
    commit('PENDING_CROPS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/crops', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CROPS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_CROPS', false)
      })
    })
  },

  // update
  updateCrops ({ commit }, payload) {
    commit('PENDING_CROPS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/crops/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CROPS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_CROPS', false)
      })
    })
  },

  // delete
  deleteCrops ({ commit }, payload) {
    commit('DELETING_CROPS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/crops/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CROPS', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_CROPS', false)
      })
    })
  }
}
export const getters = {
  loadCrops (state) { return state.loading },
  oneLoadCrops (state) { return state.oneLoading },
  pendingCrops (state) { return state.pending },
  deletingCrops (state) { return state.deleting },
  dataCrops (state) { return state.data },
  errorCrops (state) { return state.error },
  paginationCrops (state) { return state.pagination }
}
