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
  'ERROR_NEWS_CATEGORIES' (state, payload) { state.error = payload },
  'GET_NEWS_CATEGORIES' (state, payload) { state.data = payload },
  'LOAD_NEWS_CATEGORIES' (state, payload) { state.loading = payload },
  'ONE_NEWS_CATEGORIES' (state, payload) { state.oneLoading = payload },
  'PENDING_NEWS_CATEGORIES' (state, payload) { state.pending = payload },
  'DELETING_NEWS_CATEGORIES' (state, payload) { state.deleting = payload },
  'PAGINATION_NEWS_CATEGORIES' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  getNewsCategory ({ commit }, payload) {
    commit('LOAD_NEWS_CATEGORIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/newscategories', { params: payload }).then((res) => {
        commit('GET_NEWS_CATEGORIES', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_NEWS_CATEGORIES', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_NEWS_CATEGORIES', false)
      })
    })
  },

  // get id
  getNewsCategoryById ({ commit }, payload) {
    commit('ONE_LOAD_NEWS_CATEGORIES', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/newscategories/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_NEWS_CATEGORIES', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_NEWS_CATEGORIES', false)
      })
    })
  }
}

export const getters = {
  loadNewsCategory (state) { return state.loading },
  oneLoadNewsCategory (state) { return state.oneLoading },
  pendingNewsCategory (state) { return state.pending },
  deletingNewsCategory (state) { return state.deleting },
  dataNewsCategory (state) { return state.data },
  errorNewsCategory (state) { return state.error },
  paginationNewsCategory (state) { return state.pagination }
}
