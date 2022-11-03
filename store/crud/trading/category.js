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
  'ERROR_TRADING_CATEGORIES' (state, payload) { state.error = payload },
  'GET_TRADING_CATEGORIES' (state, payload) { state.data = payload },
  'LOAD_TRADING_CATEGORIES' (state, payload) { state.loading = payload },
  'ONE_TRADING_CATEGORIES' (state, payload) { state.oneLoading = payload },
  'PENDING_TRADING_CATEGORIES' (state, payload) { state.pending = payload },
  'DELETING_TRADING_CATEGORIES' (state, payload) { state.deleting = payload },
  'PAGINATION_TRADING_CATEGORIES' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getTradingCategory ({ commit }, payload) {
    commit('LOAD_TRADING_CATEGORIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/tradingcatnews/nested', { params: payload }).then((res) => {
        commit('GET_TRADING_CATEGORIES', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_CATEGORIES', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TRADING_CATEGORIES', false)
      })
    })
  },

  // get id
  getTradingCategoryById ({ commit }, payload) {
    commit('ONE_LOAD_TRADING_CATEGORIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/tradingcatnews/nested/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_CATEGORIES', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TRADING_CATEGORIES', false)
      })
    })
  }
}

export const getters = {
  loadTradingCategory (state) { return state.loading },
  oneLoadTradingCategory (state) { return state.oneLoading },
  pendingTradingCategory (state) { return state.pending },
  deletingTradingCategory (state) { return state.deleting },
  dataTradingCategory (state) { return state.data },
  errorTradingCategory (state) { return state.error },
  paginationTradingCategory (state) { return state.pagination }
}
