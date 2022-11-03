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
  'ERROR_CATEGORY_CONSULTATION' (state, payload) { state.error = payload },
  'GET_CATEGORY_CONSULTATION' (state, payload) { state.data = payload },
  'LOAD_CATEGORY_CONSULTATION' (state, payload) { state.loading = payload },
  'ONE_LOAD_CATEGORY_CONSULTATION' (state, payload) { state.oneLoading = payload },
  'PENDING_CATEGORY_CONSULTATION' (state, payload) { state.pending = payload },
  'DELETING_CATEGORY_CONSULTATION' (state, payload) { state.deleting = payload },
  'PAGINATION_CATEGORY_CONSULTATION' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getCategoryConsultation ({ commit }, payload) {
    commit('LOAD_CATEGORY_CONSULTATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/consultationcategories', { params: payload }).then((res) => {
        commit('GET_CATEGORY_CONSULTATION', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CATEGORY_CONSULTATION', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_CATEGORY_CONSULTATION', false)
      })
    })
  },

  // get id
  getCategoryConsultationById ({ commit }, payload) {
    commit('ONE_LOAD_CATEGORY_CONSULTATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/consultationcategories/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CATEGORY_CONSULTATION', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_CATEGORY_CONSULTATION', false)
      })
    })
  },

  // post
  postCategoryConsultation ({ commit }, payload) {
    commit('PENDING_CATEGORY_CONSULTATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/consultationcategories', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CATEGORY_CONSULTATION', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_CATEGORY_CONSULTATION', false)
      })
    })
  },

  // update
  updateCategoryConsultation ({ commit }, payload) {
    commit('PENDING_CATEGORY_CONSULTATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/consultationcategories/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CATEGORY_CONSULTATION', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_CATEGORY_CONSULTATION', false)
      })
    })
  },

  // delete
  deleteCategoryConsulttion ({ commit }, payload) {
    commit('DELETING_CATEGORY_CONSULTATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/consultationcategories/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CATEGORY_CONSULTATION', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_CATEGORY_CONSULTATION', false)
      })
    })
  }
}
export const getters = {
  loadCategoryConsultation (state) { return state.loading },
  oneLoadCategoryConsultation (state) { return state.oneLoading },
  pendingCategoryConsultation (state) { return state.pending },
  deletingCategoryConsultation (state) { return state.deleting },
  dataCategoryConsultation (state) { return state.data },
  errorCategoryConsultation (state) { return state.error },
  paginationCategoryConsultation (state) { return state.pagination }
}
