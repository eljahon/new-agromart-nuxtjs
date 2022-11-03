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
  'ERROR_TRADING_TYPE' (state, payload) { state.error = payload },
  'GET_TRADING_TYPE' (state, payload) { state.data = payload },
  'LOAD_TRADING_TYPE' (state, payload) { state.loading = payload },
  'ONE_TRADING_TYPE' (state, payload) { state.oneLoading = payload },
  'PENDING_TRADING_TYPE' (state, payload) { state.pending = payload },
  'DELETING_TRADING_TYPE' (state, payload) { state.deleting = payload },
  'PAGINATION_TRADING_TYPE' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getTradingType ({ commit }, payload) {
    commit('LOAD_TRADING_TYPE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/tradingposttypes', { params: payload }).then((res) => {
        commit('GET_TRADING_TYPE', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_TYPE', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TRADING_TYPE', false)
      })
    })
  },

  // get id
  getTradingTypeById ({ commit }, payload) {
    commit('ONE_LOAD_TRADING_TYPE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/tradingposttypes/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_TYPE', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TRADING_TYPE', false)
      })
    })
  }
}

export const getters = {
  loadTradingType (state) { return state.loading },
  oneLoadTradingType (state) { return state.oneLoading },
  pendingTradingType (state) { return state.pending },
  deletingTradingType (state) { return state.deleting },
  dataTradingType (state) { return state.data },
  errorTradingType (state) { return state.error },
  paginationTradingType (state) { return state.pagination }
}
