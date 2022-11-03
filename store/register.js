import AxiosInit from '~/utils/axios_init'
export const state = () => ({
  user: {},
  error: ''
})
export const mutations = {
  'SET_USER' (state, params) {
    state.user = params
  },
  'ERROR' (state, params) {
    state.error = params
  }
}
export const actions = {
  setUser ({ commit }, params) {
    return new Promise((resolve, reject) => {
      AxiosInit.post('/auth/user/register', params).then((res) => {
        commit('SET_USER', res)
        resolve(res)
      }).catch((error) => {
        commit('ERROR', error)
        reject(error)
      })
    })
  }
}
export const getters = {}
