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
  'ERROR_COMPANIES' (state, payload) { state.error = payload },
  'GET_COMPANIES' (state, payload) { state.data = payload },
  'LOAD_COMPANIES' (state, payload) { state.loading = payload },
  'ONE_LOAD_COMPANIES' (state, payload) { state.oneLoading = payload },
  'PENDING_COMPANIES' (state, payload) { state.pending = payload },
  'DELETING_COMPANIES' (state, payload) { state.deleting = payload },
  'PAGINATION_COMPANIES' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getCompanies ({ commit }, payload) {
    commit('LOAD_COMPANIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/companies', { params: payload }).then((res) => {
        commit('GET_COMPANIES', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_COMPANIES', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_COMPANIES', false)
      })
    })
  },

  // get id
  getCompaniesById ({ commit }, payload) {
    commit('ONE_LOAD_COMPANIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/companies/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_COMPANIES', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_COMPANIES', false)
      })
    })
  },

  // post
  postCompanies ({ commit }, payload) {
    commit('PENDING_COMPANIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/companies', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_COMPANIES', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_COMPANIES', false)
      })
    })
  },

  // update
  updateCompanies ({ commit }, payload) {
    commit('PENDING_COMPANIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/companies/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_COMPANIES', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_COMPANIES', false)
      })
    })
  },

  // delete
  deleteCompanies ({ commit }, payload) {
    commit('DELETING_COMPANIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/companies/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_COMPANIES', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_COMPANIES', false)
      })
    })
  }
}
export const getters = {
  loadCompanies (state) { return state.loading },
  oneLoadCompanies (state) { return state.oneLoading },
  pendingCompanies (state) { return state.pending },
  deletingCompanies (state) { return state.deleting },
  dataCompanies (state) { return state.data },
  errorCompanies (state) { return state.error },
  paginationCompanies (state) { return state.pagination }
}
