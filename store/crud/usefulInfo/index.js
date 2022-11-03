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
  'ERROR_USEFUL_INFORMATION' (state, payload) { state.error = payload },
  'GET_USEFUL_INFORMATION' (state, payload) { state.data = payload },
  'LOAD_USEFUL_INFORMATION' (state, payload) { state.loading = payload },
  'ONE_LOAD_USEFUL_INFORMATION' (state, payload) { state.oneLoading = payload },
  'PENDING_USEFUL_INFORMATION' (state, payload) { state.pending = payload },
  'DELETING_USEFUL_INFORMATION' (state, payload) { state.deleting = payload },
  'PAGINATION_USEFUL_INFORMATION' (state, payload) { state.pagination = payload }
}
export const actions = {
  // get
  getUsefulInformation ({ commit, state }, payload) {
    commit('LOAD_USEFUL_INFORMATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/usefullinfo/${payload.locale}`, { params: payload.query }).then((res) => {
        this.$axios.$get(`/usefullinfo/${payload.locale}/count`, { params: payload.query }).then((count) => {
          commit('PAGINATION_USEFUL_INFORMATION', {
            page: (payload.query && payload.query.page) || 1,
            total: count,
            limit: state.pagination.limit,
            pageCount: count % state.pagination.limit > 0 ? (Math.trunc(count / state.pagination.limit) + 1) : count / state.pagination.limit
          })
        })
        commit('GET_USEFUL_INFORMATION', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USEFUL_INFORMATION', error)
        reject(error)
      }).finally(() => {
        commit('LOAD_USEFUL_INFORMATION', false)
      })
    })
  },

  // get id
  getUsefulInformationById ({ commit }, payload) {
    commit('ONE_LOAD_USEFUL_INFORMATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/usefulinfos/${payload.id}/`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USEFUL_INFORMATION', error)
        reject(error)
      }).finally(() => {
        commit('ONE_LOAD_USEFUL_INFORMATION', false)
      })
    })
  },

  // post
  postUsefulInformation ({ commit }, payload) {
    commit('PENDING_USEFUL_INFORMATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post('/usefulinfos', payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USEFUL_INFORMATION', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_USEFUL_INFORMATION', false)
      })
    })
  },

  // update
  updateUsefulInformation ({ commit }, payload) {
    commit('PENDING_USEFUL_INFORMATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/usefulinfos/${payload.id}/`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USEFUL_INFORMATION', error)
        reject(error)
      }).finally(() => {
        commit('PENDING_USEFUL_INFORMATION', false)
      })
    })
  },

  // delete
  deleteUsefulInformation ({ commit }, payload) {
    commit('DELETING_USEFUL_INFORMATION', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`/usefulinfos/${payload}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR_USEFUL_INFORMATION', error)
        reject(error)
      }).finally(() => {
        commit('DELETING_USEFUL_INFORMATION', false)
      })
    })
  }
}
export const getters = {
  loadUsefulInformation (state) { return state.loading },
  oneLoadUsefulInformation (state) { return state.oneLoading },
  pendingUsefulInformation (state) { return state.pending },
  deletingUsefulInformation (state) { return state.deleting },
  dataUsefulInformation (state) { return state.data },
  errorUsefulInformation (state) { return state.error },
  paginationUsefulInformation (state) { return state.pagination }
}
