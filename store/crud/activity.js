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
  'ERROR_ACTIVITIES' (state, payload) { state.error = payload },
  'GET_ACTIVITIES' (state, payload) { state.data = payload },
  'LOAD_ACTIVITIES' (state, payload) { state.loading = payload },
  'ONE_LOAD_ACTIVITIES' (state, payload) { state.oneLoading = payload },
  'PENDING_ACTIVITIES' (state, payload) { state.pending = payload },
  'DELETING_ACTIVITIES' (state, payload) { state.deleting = payload },
  'PAGINATION_ACTIVITIES' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getActivities ({ commit }, payload) {
    commit('LOAD_ACTIVITIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/activities', { params: payload }).then((res) => {
        commit('GET_ACTIVITIES', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_ACTIVITIES', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_ACTIVITIES', false)
      })
    })
  },

  // get id
  getActivitiesById ({ commit }, payload) {
    commit('ONE_LOAD_ACTIVITIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/activities/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_ACTIVITIES', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_ACTIVITIES', false)
      })
    })
  },

  // post
  postActivities ({ commit }, payload) {
    commit('PENDING_ACTIVITIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/activities', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_ACTIVITIES', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_ACTIVITIES', false)
      })
    })
  },

  // update
  updateActivities ({ commit }, payload) {
    commit('PENDING_ACTIVITIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/activities/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_ACTIVITIES', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_ACTIVITIES', false)
      })
    })
  },

  // delete
  deleteActivities ({ commit }, payload) {
    commit('DELETING_ACTIVITIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/activities/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_ACTIVITIES', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_ACTIVITIES', false)
      })
    })
  }
}
export const getters = {
  loadActivities (state) { return state.loading },
  oneLoadActivities (state) { return state.oneLoading },
  pendingActivities (state) { return state.pending },
  deletingActivities (state) { return state.deleting },
  dataActivities (state) { return state.data },
  errorActivities (state) { return state.error },
  paginationActivities (state) { return state.pagination }
}
