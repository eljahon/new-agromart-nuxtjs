import constants from '~/utils/constants'
import tools from '~/utils/tools'
export const state = () => ({
  query: constants.query
})

export const mutations = {
  'SET_QUERY' (state, payload) {
    state.query = payload
  }
}

export const actions = {
  setQuery ({ commit }, payload) {
    commit('SET_QUERY', payload)
  }
}

export const getters = {
  getQuery (state) { return tools.emptyObject(state.query) }
}
