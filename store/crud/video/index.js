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
  'ERROR_VIDEO' (state, payload) { state.error = payload },
  'GET_VIDEO' (state, payload) { state.data = payload },
  'LOAD_VIDEO' (state, payload) { state.loading = payload },
  'ONE_LOAD_VIDEO' (state, payload) { state.oneLoading = payload },
  'PENDING_VIDEO' (state, payload) { state.pending = payload },
  'DELETING_VIDEO' (state, payload) { state.deleting = payload },
  'PAGINATION_VIDEO' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getVideo ({ commit, state }, payload) {
    commit('LOAD_VIDEO', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/videos', { params: payload }).then((res) => {
        this.$axios.$get('/videos/count', { params: payload }).then((count) => {
          commit('PAGINATION_VIDEO', {
            page: (payload && payload.page) || 1,
            total: count,
            limit: state.pagination.limit,
            pageCount: count % state.pagination.limit > 0 ? (Math.trunc(count / state.pagination.limit) + 1) : count / state.pagination.limit
          })
        })
        commit('GET_VIDEO', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_VIDEO', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_VIDEO', false)
      })
    })
  },

  // get id
  getVideoById ({ commit }, payload) {
    commit('ONE_LOAD_VIDEO', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/videos/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_VIDEO', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_VIDEO', false)
      })
    })
  },

  // post
  postVideo ({ commit }, payload) {
    commit('PENDING_VIDEO', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/videos', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_VIDEO', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_VIDEO', false)
      })
    })
  },

  // update
  updateVideo ({ commit }, payload) {
    commit('PENDING_VIDEO', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/videos/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_VIDEO', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_VIDEO', false)
      })
    })
  },

  // delete
  deleteVideo ({ commit }, payload) {
    commit('DELETING_VIDEO', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/videos/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_VIDEO', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_VIDEO', false)
      })
    })
  }
}
export const getters = {
  loadVideo (state) { return state.loading },
  oneLoadVideo (state) { return state.oneLoading },
  pendingVideo (state) { return state.pending },
  deletingVideo (state) { return state.deleting },
  dataVideo (state) { return state.data },
  errorVideo (state) { return state.error },
  paginationVideo (state) { return state.pagination }
}
