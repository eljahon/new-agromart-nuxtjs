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
  'ERROR_FIELDS' (state, payload) { state.error = payload },
  'GET_FIELDS' (state, payload) { state.data = payload },
  'LOAD_FIELDS' (state, payload) { state.loading = payload },
  'ONE_LOAD_FIELDS' (state, payload) { state.oneLoading = payload },
  'PENDING_FIELDS' (state, payload) { state.pending = payload },
  'DELETING_FIELDS' (state, payload) { state.deleting = payload },
  'PAGINATION_FIELDS' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getFields ({ commit }, payload) {
    commit('LOAD_FIELDS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/fields', { params: payload }).then((res) => {
        commit('GET_FIELDS', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_FIELDS', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_FIELDS', false)
      })
    })
  },

  // get id
  getFieldsById ({ commit }, payload) {
    commit('ONE_LOAD_FIELDS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/fields/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_FIELDS', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_FIELDS', false)
      })
    })
  },

  // post
  postFields ({ commit }, payload) {
    commit('PENDING_FIELDS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/fields', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_FIELDS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_FIELDS', false)
      })
    })
  },

  // update
  updateFields ({ commit }, payload) {
    commit('PENDING_FIELDS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/fields/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_FIELDS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_FIELDS', false)
      })
    })
  },

  // delete
  deleteFields ({ commit }, payload) {
    commit('DELETING_FIELDS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/fields/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_FIELDS', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_FIELDS', false)
      })
    })
  }
}
export const getters = {
  loadFields (state) { return state.loading },
  oneLoadFields (state) { return state.oneLoading },
  pendingFields (state) { return state.pending },
  deletingFields (state) { return state.deleting },
  dataFields (state) { return state.data },
  errorFields (state) { return state.error },
  paginationFields (state) { return state.pagination }
}
