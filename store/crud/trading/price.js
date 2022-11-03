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
  'ERROR_PRICE_TYPE' (state, payload) { state.error = payload },
  'GET_PRICE_TYPE' (state, payload) { state.data = payload },
  'LOAD_PRICE_TYPE' (state, payload) { state.loading = payload },
  'ONE_PRICE_TYPE' (state, payload) { state.oneLoading = payload },
  'PENDING_PRICE_TYPE' (state, payload) { state.pending = payload },
  'DELETING_PRICE_TYPE' (state, payload) { state.deleting = payload },
  'PAGINATION_PRICE_TYPE' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getPriceType ({ commit }, payload) {
    commit('LOAD_PRICE_TYPE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/tradingpricetypes', { params: payload }).then((res) => {
        commit('GET_PRICE_TYPE', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRICE_TYPE', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_PRICE_TYPE', false)
      })
    })
  },

  // get id
  getPriceTypeById ({ commit }, payload) {
    commit('ONE_LOAD_PRICE_TYPE', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/tradingpricetypes/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRICE_TYPE', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_PRICE_TYPE', false)
      })
    })
  }
}

export const getters = {
  loadTPriceType (state) { return state.loading },
  oneLoadPriceType (state) { return state.oneLoading },
  pendingPriceType (state) { return state.pending },
  deletingPriceType (state) { return state.deleting },
  dataPriceType (state) { return state.data },
  errorPriceType (state) { return state.error },
  paginationPriceType (state) { return state.pagination }
}
