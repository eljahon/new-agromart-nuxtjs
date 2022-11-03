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
  'ERROR_MEDIA' (state, payload) { state.error = payload },
  'GET_MEDIA' (state, payload) { state.data = payload },
  'LOAD_MEDIA' (state, payload) { state.loading = payload },
  'ONE_LOAD_MEDIA' (state, payload) { state.oneLoading = payload },
  'PENDING_MEDIA' (state, payload) { state.pending = payload },
  'DELETING_MEDIA' (state, payload) { state.deleting = payload },
  'PAGINATION_MEDIA' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getMedia ({ commit }, payload) {
    commit('LOAD_MEDIA', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/media/list/', { params: payload }).then((res) => {
        commit('GET_MEDIA', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MEDIA', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_MEDIA', false)
      })
    })
  },

  // get id
  getMediaById ({ commit }, payload) {
    commit('ONE_LOAD_MEDIA', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/media/detail/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MEDIA', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_MEDIA', false)
      })
    })
  },

  // post
  postMedia ({ commit }, payload) {
    commit('PENDING_MEDIA', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/media/create/', payload).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MEDIA', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_MEDIA', false)
      })
    })
  },

  // delete
  deleteMedia ({ commit }, payload) {
    commit('DELETING_MEDIA', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/media/delete/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_MEDIA', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_MEDIA', false)
      })
    })
  }
}

export const getters = {
  loadMedia (state) { return state.loading },
  oneLoadMedia (state) { return state.oneLoading },
  pendingMedia (state) { return state.pending },
  deletingMedia (state) { return state.deleting },
  dataMedia (state) { return state.data },
  errorMedia (state) { return state.error },
  paginationMedia (state) { return state.pagination }
}
