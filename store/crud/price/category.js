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
  'ERROR_PRODUCT_CATEGORY' (state, payload) { state.error = payload },
  'GET_PRODUCT_CATEGORY' (state, payload) { state.data = payload },
  'LOAD_PRODUCT_CATEGORY' (state, payload) { state.loading = payload },
  'ONE_LOAD_PRODUCT_CATEGORY' (state, payload) { state.oneLoading = payload },
  'PENDING_PRODUCT_CATEGORY' (state, payload) { state.pending = payload },
  'DELETING_PRODUCT_CATEGORY' (state, payload) { state.deleting = payload },
  'PAGINATION_PRODUCT_CATEGORY' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getProductCategory ({ commit }, payload) {
    commit('LOAD_PRODUCT_CATEGORY', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get('/productcategories', { params: payload }).then((res) => {
        commit('GET_PRODUCT_CATEGORY', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRODUCT_CATEGORY', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_PRODUCT_CATEGORY', false)
      })
    })
  },

  // get id
  getProductCategoryById ({ commit }, payload) {
    commit('ONE_LOAD_PRODUCT_CATEGORY', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/productcategories/${payload}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRODUCT_CATEGORY', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_PRODUCT_CATEGORY', false)
      })
    })
  },

  // update
  updateProductCategory ({ commit }, payload) {
    commit('PENDING_PRODUCT_CATEGORY', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/productcategories/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRODUCT_CATEGORY', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_PRODUCT_CATEGORY', false)
      })
    })
  },

  // delete
  deleteProductCategory ({ commit }, payload) {
    commit('DELETING_PRODUCT_CATEGORY', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/productcategories/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_PRODUCT_CATEGORY', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_PRODUCT_CATEGORY', false)
      })
    })
  }
}

export const getters = {
  loadProductCategory (state) { return state.loading },
  oneLoadProductCategory (state) { return state.oneLoading },
  pendingProductCategory (state) { return state.pending },
  deletingProductCategory (state) { return state.deleting },
  dataProductCategory (state) { return state.data },
  errorProductCategory (state) { return state.error },
  paginationProductCategory (state) { return state.pagination }
}
