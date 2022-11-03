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
  'ERROR' (state, payload) { state.error = payload },
  'GET' (state, payload) { state.data = payload },
  'LOAD' (state, payload) { state.loading = payload },
  'ONE_LOAD' (state, payload) { state.oneLoading = payload },
  'PENDING' (state, payload) { state.pending = payload },
  'DELETING' (state, payload) { state.deleting = payload },
  'PAGINATION' (state, payload) { state.pagination = payload }
}

export const actions = {
  // get
  get ({ commit, state }, payload) {
    commit('LOAD', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`${payload.url}`, { params: payload.query }).then((res) => {
        commit('GET', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR', error)
        reject(error)
      }).finally(() => {
        commit('LOAD', false)
      })
    })
  },

  // get id
  getById ({ commit }, payload) {
    commit('ONE_LOAD', true)
    return new Promise((resolve, reject) => {
      this.$axios.$get(`${payload.url}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR', error)
        reject(error)
      }).finally(() => {
        commit('LOAD', false)
      })
    })
  },

  // post
  post ({ commit }, payload) {
    commit('PENDING', true)
    return new Promise((resolve, reject) => {
      this.$axios.$post(`${payload.url}`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR', error)
        reject(error)
      }).finally(() => {
        commit('PENDING', false)
      })
    })
  },

  // uptade
  put ({ commit }, payload) {
    commit('PENDING', true)
    return new Promise((resolve, reject) => {
      this.$axios.$put(`${payload.url}`, payload.data).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR', error)
        reject(error)
      }).finally(() => {
        commit('PENDING', false)
      })
    })
  },

  // delete
  delete ({ commit }, payload) {
    commit('DELETING', true)
    return new Promise((resolve, reject) => {
      this.$axios.$remove(`${payload.url}`).then((res) => {
        resolve(res)
      }).catch((error) => {
        commit('ERROR', error)
        reject(error)
      }).finally(() => {
        commit('DELETING', false)
      })
    })
  }
}

export const getters = {
  load (state) { return state.loading },
  oneLoad (state) { return state.oneLoading },
  pending (state) { return state.pending },
  deleting (state) { return state.deleting },
  data (state) { return state.data },
  error (state) { return state.error },
  pagination (state) { return state.pagination }
}
