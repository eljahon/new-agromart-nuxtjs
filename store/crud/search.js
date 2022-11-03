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
  'ERROR_SEARCH' (state, payload) { state.error = payload },
  'GET_SEARCH' (state, payload) { state.data = payload },
  'LOAD_SEARCH' (state, payload) { state.loading = payload },
  'ONE_LOAD_SEARCH' (state, payload) { state.oneLoading = payload },
  'PENDING_SEARCH' (state, payload) { state.pending = payload },
  'DELETING_SEARCH' (state, payload) { state.deleting = payload },
  'PAGINATION_SEARCH' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getSearch ({ commit, state }, payload) {
    commit('LOAD_SEARCH', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/news-agromarts/search/${payload.type}`, { params: payload.query }).then((res) => {
        this.$axios.$get(`/news-agromarts/countsearch/${payload.type}`, { params: payload.query }).then((count) => {
          commit('PAGINATION_SEARCH', {
            page: (payload && payload.page) || 1,
            total: count,
            limit: state.pagination.limit,
            pageCount: count % state.pagination.limit > 0 ? (Math.trunc(count / state.pagination.limit) + 1) : count / state.pagination.limit
          })
        })
        commit('GET_SEARCH', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEARCH', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_SEARCH', false)
      })
    })
  },

  // get id
  getSearchById ({ commit }, payload) {
    commit('ONE_LOAD_SEARCH', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/searchs/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEARCH', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_SEARCH', false)
      })
    })
  },

  // post
  Search ({ commit }, payload) {
    commit('PENDING_SEARCH', true)
    return new Promise((resolve, reject) => {
      this.$axios.$('/searchs', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEARCH', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_SEARCH', false)
      })
    })
  },

  // uptade
  updateSearch ({ commit }, payload) {
    commit('PENDING_SEARCH', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/searchs/${payload.data.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEARCH', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_SEARCH', false)
      })
    })
  },

  // delete
  deleteSearch ({ commit }, payload) {
    commit('DELETING_SEARCH', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/searchs/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_SEARCH', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_SEARCH', false)
      })
    })
  }
}

export const getters = {
  loadSearch (state) { return state.loading },
  oneLoadSearch (state) { return state.oneLoading },
  pendingSearch (state) { return state.pending },
  deletingSearch (state) { return state.deleting },
  dataSearch (state) { return state.data },
  errorSearch (state) { return state.error },
  paginationSearch (state) { return state.pagination }
}
