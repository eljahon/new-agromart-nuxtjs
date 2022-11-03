import AxiosInit from '~/utils/axios_init'
import tools from '~/utils/tools'
const crud = function (param) {
  const toUpper = param.toUpperCase()
  const _mutations = {
    error: `ERROR_${toUpper}`,
    load: `LOAD_${toUpper}`,
    oneLoad: `ONE_LOAD_${toUpper}`,
    pending: `PENDING_${toUpper}`,
    deleting: `DELETING_${toUpper}`,
    data: `GET_${toUpper}`,
    pagination: `PAGINATION_${toUpper}`
  }
  return {
    state: {
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
    },
    getters: {
      [tools.camelize(`load ${param}`)] (state) { return state.loading },
      [tools.camelize(`one load ${param}`)] (state) { return state.oneLoading },
      [tools.camelize(`pending ${param}`)] (state) { return state.pending },
      [tools.camelize(`deleting ${param}`)] (state) { return state.deleting },
      [tools.camelize(`data ${param}`)] (state) { return state.data },
      [tools.camelize(`error ${param}`)] (state) { return state.error },
      [tools.camelize(`pagination ${param}`)] (state) { return state.pagination }
    },
    mutations: {
      [_mutations.error] (state, payload) { state.error = payload },
      [_mutations.data] (state, payload) { state.data = payload },
      [_mutations.load] (state, payload) { state.loading = payload },
      [_mutations.oneLoad] (state, payload) { state.oneLoading = payload },
      [_mutations.pending] (state, payload) { state.pending = payload },
      [_mutations.deleting] (state, payload) { state.deleting = payload },
      [_mutations.pagination] (state, payload) { state.pagination = payload }
    },
    actions: {
      // get
      [tools.camelize(`get ${param}`)] ({ commit }, params) {
        commit(_mutations.load, true)
        return new Promise((resolve, reject) => {
          AxiosInit.get(`/api/v1/${param}/city/list`, params).then((res) => {
            const _res = res
            // const _total = res.count
            commit(_mutations.data, _res)
            // commit(_mutations.pagination, {
            //   page: params?.page,
            //   total: _total
            // })
            resolve(_res)
          }).catch((error) => {
            commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.load, false)
          })
        })
      },

      // get id
      [tools.camelize(`get by id ${param}`)] ({ commit }, payload) {
        commit(_mutations.oneLoad, true)
        return new Promise((resolve, reject) => {
          AxiosInit.get(`${param}/${payload}/`).then((res) => {
            resolve(res)
          }).catch((error) => {
            commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.oneLoad, false)
          })
        })
      },

      // post
      [tools.camelize(`post ${param}`)] ({ commit }, payload) {
        commit(_mutations.pending, true)
        return new Promise((resolve, reject) => {
          AxiosInit.post(`${param}/`, payload.data).then((res) => {
            resolve(res)
          }).catch((error) => {
            // commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.pending, false)
          })
        })
      },

      // update
      [tools.camelize(`put ${param}`)] ({ commit }, payload) {
        commit(_mutations.pending, true)
        return new Promise((resolve, reject) => {
          AxiosInit.put(`${param}/${payload.id}/`, payload.data).then((res) => {
            resolve(res)
          }).catch((error) => {
            // commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.pending, false)
          })
        })
      },

      // delete
      [tools.camelize(`delete ${param}`)] ({ commit }, payload) {
        commit(_mutations.deleting, true)
        return new Promise((resolve, reject) => {
          AxiosInit.remove(`${param}/${payload}`).then((res) => {
            resolve(res)
          }).catch((error) => {
            // commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.deleting, false)
          })
        })
      }
    }
  }
}
export default crud
