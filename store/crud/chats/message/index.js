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
  'ERROR_MESSAGES' (state, payload) { state.error = payload },
  'GET_MESSAGES' (state, payload) { state.data = payload },
  'LOAD_MESSAGES' (state, payload) { state.loading = payload },
  'ONE_LOAD_MESSAGES' (state, payload) { state.oneLoading = payload },
  'PENDING_MESSAGES' (state, payload) { state.pending = payload },
  'DELETING_MESSAGES' (state, payload) { state.deleting = payload },
  'PAGINATION_MESSAGES' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getMessages ({ commit }, payload) {
    commit('LOAD_MESSAGES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/chat-messages/', { params: payload }).then((res) => {
        commit('GET_MESSAGES', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MESSAGES', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_MESSAGES', false)
      })
    })
  },

  // get id
  getMessagesById ({ commit }, payload) {
    commit('ONE_LOAD_MESSAGES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/chat-messages/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MESSAGES', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_MESSAGES', false)
      })
    })
  },

  // post
  postMessages ({ commit }, payload) {
    commit('PENDING_MESSAGES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/chat-messages/', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MESSAGES', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_MESSAGES', false)
      })
    })
  },

  // update
  updateMessages ({ commit }, payload) {
    commit('PENDING_MESSAGES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/chat-messages/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MESSAGES', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_MESSAGES', false)
      })
    })
  },

  // delete
  deleteMessages ({ commit }, payload) {
    commit('DELETING_MESSAGES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/chat-messages/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MESSAGES', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_MESSAGES', false)
      })
    })
  }
}
export const getters = {
  loadMessages (state) { return state.loading },
  oneLoadMessages (state) { return state.oneLoading },
  pendingMessages (state) { return state.pending },
  deletingMessages (state) { return state.deleting },
  dataMessages (state) { return state.data },
  errorMessages (state) { return state.error },
  paginationMessages (state) { return state.pagination }
}
