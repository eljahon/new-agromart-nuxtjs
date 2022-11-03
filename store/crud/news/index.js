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
  'ERROR_NEWS' (state, payload) { state.error = payload },
  'GET_NEWS' (state, payload) { state.data = payload },
  'LOAD_NEWS' (state, payload) { state.loading = payload },
  'ONE_LOAD_NEWS' (state, payload) { state.oneLoading = payload },
  'PENDING_NEWS' (state, payload) { state.pending = payload },
  'DELETING_NEWS' (state, payload) { state.deleting = payload },
  'PAGINATION_NEWS' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getNews ({ commit, state }, payload) {
    commit('LOAD_NEWS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/news/${payload.locale}`, { params: payload.query }).then((res) => {
        this.$axios.$get(`/news/${payload.locale}/count`, { params: payload.query }).then((count) => {
          commit('PAGINATION_NEWS', {
            page: (payload.query && payload.query.page) || 1,
            total: count,
            limit: state.pagination.limit,
            pageCount: count % state.pagination.limit > 0 ? (Math.trunc(count / state.pagination.limit) + 1) : count / state.pagination.limit
          })
        })
        commit('GET_NEWS', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_NEWS', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_NEWS', false)
      })
    })
  },

  // get id
  getNewsById ({ commit }, payload) {
    commit('ONE_LOAD_NEWS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/news-agromarts/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_NEWS', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_NEWS', false)
      })
    })
  },

  // post
  postNews ({ commit }, payload) {
    commit('PENDING_NEWS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$news('/news-agromarts', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_NEWS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_NEWS', false)
      })
    })
  },

  // uptade
  updateNews ({ commit }, payload) {
    commit('PENDING_NEWS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/news-agromarts/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_NEWS', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_NEWS', false)
      })
    })
  },

  // delete
  deleteNews ({ commit }, payload) {
    commit('DELETING_NEWS', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/news-agromarts/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_NEWS', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_NEWS', false)
      })
    })
  }
}

export const getters = {
  loadNews (state) { return state.loading },
  oneLoadNews (state) { return state.oneLoading },
  pendingNews (state) { return state.pending },
  deletingNews (state) { return state.deleting },
  dataNews (state) { return state.data },
  errorNews (state) { return state.error },
  paginationNews (state) { return state.pagination }
}
