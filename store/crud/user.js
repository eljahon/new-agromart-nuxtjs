export const state = () => ({
  loading: false,
  oneLoading: false,
  pending: false,
  deleting: false,
  error: null,
  data: [],
  pagination: {
    page: 1,
    total: 0,
    limit: 12,
    pageCount: 1
  }
})
export const mutations = {
  'ERROR_USERS' (state, payload) { state.error = payload },
  'GET_USERS' (state, payload) { state.data = payload },
  'LOAD_USERS' (state, payload) { state.loading = payload },
  'ONE_LOAD_USERS' (state, payload) { state.oneLoading = payload },
  'PENDING_USERS' (state, payload) { state.pending = payload },
  'DELETING_USERS' (state, payload) { state.deleting = payload },
  'PAGINATION_USERS' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getUsers ({ commit, state }, payload) {
    commit('LOAD_USERS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/users/', { params: payload }).then((res) => {
        this.$axios.$get('/users/count', { params: payload }).then((count) => {
          commit('PAGINATION_USERS', {
            page: (payload && payload.page) || 1,
            total: count,
            limit: state.pagination.limit,
            pageCount: count % state.pagination.limit > 0 ? (Math.trunc(count / state.pagination.limit) + 1) : count / state.pagination.limit
          })
        })
        commit('GET_USERS', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USERS', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_USERS', false)
      })
    })
  },

  // get id
  getUsersById ({ commit }, payload) {
    commit('ONE_LOAD_USERS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/users/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USERS', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_USERS', false)
      })
    })
  },

  // post
  postUsers ({ commit }, payload) {
    commit('PENDING_USERS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/users/', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USERS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_USERS', false)
      })
    })
  },

  // update
  updateUsers ({ commit }, payload) {
    commit('PENDING_USERS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/users/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USERS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_USERS', false)
      })
    })
  },

  // delete
  deleteUsers ({ commit }, payload) {
    commit('DELETING_USERS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/users/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USERS', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_USERS', false)
      })
    })
  }
}
export const getters = {
  loadUsers (state) { return state.loading },
  oneLoadUsers (state) { return state.oneLoading },
  pendingUsers (state) { return state.pending },
  deletingUsers (state) { return state.deleting },
  dataUsers (state) { return state.data },
  errorUsers (state) { return state.error },
  paginationUsers (state) { return state.pagination }
}
