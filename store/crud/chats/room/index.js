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
  'ERROR_CHAT_ROOM' (state, payload) { state.error = payload },
  'GET_CHAT_ROOM' (state, payload) { state.data = payload },
  'LOAD_CHAT_ROOM' (state, payload) { state.loading = payload },
  'ONE_LOAD_CHAT_ROOM' (state, payload) { state.oneLoading = payload },
  'PENDING_CHAT_ROOM' (state, payload) { state.pending = payload },
  'DELETING_CHAT_ROOM' (state, payload) { state.deleting = payload },
  'PAGINATION_CHAT_ROOM' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getRooms ({ commit }, payload) {
    commit('LOAD_CHAT_ROOM', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/get_customized_rooms', { params: payload }).then((res) => {
        commit('GET_CHAT_ROOM', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CHAT_ROOM', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_CHAT_ROOM', false)
      })
    })
  },

  // get id
  getRoomsById ({ commit }, payload) {
    commit('ONE_LOAD_CHAT_ROOM', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/chat-rooms/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CHAT_ROOM', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_CHAT_ROOM', false)
      })
    })
  },

  // post
  postRooms ({ commit }, payload) {
    commit('PENDING_CHAT_ROOM', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/chat-rooms/', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CHAT_ROOM', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_CHAT_ROOM', false)
      })
    })
  },

  // update
  updateRooms ({ commit }, payload) {
    commit('PENDING_CHAT_ROOM', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/chat-rooms/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CHAT_ROOM', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_CHAT_ROOM', false)
      })
    })
  },

  // delete
  deleteRooms ({ commit }, payload) {
    commit('DELETING_CHAT_ROOM', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/chat-rooms/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_CHAT_ROOM', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_CHAT_ROOM', false)
      })
    })
  }
}
export const getters = {
  loadRooms (state) { return state.loading },
  oneLoadRooms (state) { return state.oneLoading },
  pendingRooms (state) { return state.pending },
  deletingRooms (state) { return state.deleting },
  dataRooms (state) { return state.data },
  errorRooms (state) { return state.error },
  paginationRooms (state) { return state.pagination }
}
