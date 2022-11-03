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
  'ERROR_TRADING_UNIT' (state, payload) { state.error = payload },
  'GET_TRADING_UNIT' (state, payload) { state.data = payload },
  'LOAD_TRADING_UNIT' (state, payload) { state.loading = payload },
  'ONE_TRADING_UNIT' (state, payload) { state.oneLoading = payload },
  'PENDING_TRADING_UNIT' (state, payload) { state.pending = payload },
  'DELETING_TRADING_UNIT' (state, payload) { state.deleting = payload },
  'PAGINATION_TRADING_UNIT' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getTradingUnit ({ commit }, payload) {
    commit('LOAD_TRADING_UNIT', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/units', { params: payload }).then((res) => {
        commit('GET_TRADING_UNIT', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_UNIT', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TRADING_UNIT', false)
      })
    })
  },

  // get id
  getTradingUnitById ({ commit }, payload) {
    commit('ONE_LOAD_TRADING_UNIT', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/units/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_TRADING_UNIT', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_TRADING_UNIT', false)
      })
    })
  }
}

export const getters = {
  loadTradingUnit (state) { return state.loading },
  oneLoadTradingUnit (state) { return state.oneLoading },
  pendingTradingUnit (state) { return state.pending },
  deletingTradingUnit (state) { return state.deleting },
  dataTradingUnit (state) { return state.data },
  errorTradingUnit (state) { return state.error },
  paginationTradingUnit (state) { return state.pagination }
}
