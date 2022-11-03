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
  'ERROR_TASKS' (state, payload) { state.error = payload },
  'GET_TASKS' (state, payload) { state.data = payload },
  'LOAD_TASKS' (state, payload) { state.loading = payload },
  'ONE_LOAD_TASKS' (state, payload) { state.oneLoading = payload },
  'PENDING_TASKS' (state, payload) { state.pending = payload },
  'DELETING_TASKS' (state, payload) { state.deleting = payload },
  'PAGINATION_TASKS' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getTasks ({ commit, state }, payload) {
    commit('LOAD_TASKS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/tasks/', { params: payload }).then((res) => {
        this.$axios.$get('/tasks/count', { params: payload }).then((count) => {
          commit('PAGINATION_TASKS', {
            page: (payload && payload.page) || 1,
            total: count,
            limit: state.pagination.limit,
            pageCount: count % state.pagination.limit > 0 ? (Math.trunc(count / state.pagination.limit) + 1) : count / state.pagination.limit
          })
        })
        commit('GET_TASKS', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TASKS', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TASKS', false)
      })
    })
  },

  // get id
  getTasksById ({ commit }, payload) {
    commit('ONE_LOAD_TASKS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/tasks/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TASKS', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_TASKS', false)
      })
    })
  },

  // post
  postTasks ({ commit }, payload) {
    commit('PENDING_TASKS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/tasks/', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TASKS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_TASKS', false)
      })
    })
  },

  // update
  updateTasks ({ commit }, payload) {
    commit('PENDING_TASKS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/tasks/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TASKS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_TASKS', false)
      })
    })
  },

  // delete
  deleteTasks ({ commit }, payload) {
    commit('DELETING_TASKS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/tasks/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TASKS', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_TASKS', false)
      })
    })
  }
}
export const getters = {
  loadTasks (state) { return state.loading },
  oneLoadTasks (state) { return state.oneLoading },
  pendingTasks (state) { return state.pending },
  deletingTasks (state) { return state.deleting },
  dataTasks (state) { return state.data },
  errorTasks (state) { return state.error },
  paginationTasks (state) { return state.pagination }
}
