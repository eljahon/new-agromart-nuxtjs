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
  'ERROR_TRADING_POST' (state, payload) { state.error = payload },
  'GET_TRADING_POST' (state, payload) { state.data = payload },
  'LOAD_TRADING_POST' (state, payload) { state.loading = payload },
  'ONE_LOAD_TRADING_POST' (state, payload) { state.oneLoading = payload },
  'PENDING_TRADING_POST' (state, payload) { state.pending = payload },
  'DELETING_TRADING_POST' (state, payload) { state.deleting = payload },
  'PAGINATION_TRADING_POST' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getTradingPost ({ commit, state }, payload) {
    commit('LOAD_TRADING_POST', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/tradingposts', { params: payload }).then((res) => {
        this.$axios.$get('/tradingposts/count', { params: payload }).then((count) => {
          commit('PAGINATION_TRADING_POST', {
            page: (payload && payload.page) || 1,
            total: count,
            limit: state.pagination.limit,
            pageCount: count % state.pagination.limit > 0 ? (Math.trunc(count / state.pagination.limit) + 1) : count / state.pagination.limit
          })
        })
        commit('GET_TRADING_POST', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_POST', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TRADING_POST', false)
      })
    })
  },

  // get id
  getTradingById ({ commit }, payload) {
    commit('ONE_LOAD_TRADING_POST', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/tradingposts/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_POST', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TRADING_POST', false)
      })
    })
  },

  // post
  postTradingPost ({ commit }, payload) {
    commit('PENDING_TRADING_POST', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/tradingposts', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_POST', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_TRADING_POST', false)
      })
    })
  },

  // uptade
  updateTradingPost ({ commit }, payload) {
    commit('PENDING_TRADING_POST', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/tradingposts/${payload.data.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_POST', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_TRADING_POST', false)
      })
    })
  },

  // delete
  deleteTradingPost ({ commit }, payload) {
    commit('DELETING_TRADING_POST', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/tradingposts/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_POST', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_TRADING_POST', false)
      })
    })
  }
}

export const getters = {
  loadTradingPost (state) { return state.loading },
  oneLoadTradingPost (state) { return state.oneLoading },
  pendingTradingPost (state) { return state.pending },
  deletingTradingPost (state) { return state.deleting },
  dataTradingPost (state) { return state.data },
  errorTradingPost (state) { return state.error },
  paginationTradingPost (state) { return state.pagination }
}
