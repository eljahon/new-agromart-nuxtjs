import tools from './tools'

export const actions = (param) => {
  return {
    get: tools.camelize(`get ${param}`),
    getById: tools.camelize(`get by id ${param}`),
    post: tools.camelize(`post ${param}`),
    put: tools.camelize(`put ${param}`),
    remove: tools.camelize(`delete ${param}`)
  }
}

export const getters = (param) => {
  return {
    load: tools.camelize(`load ${param}`),
    data: tools.camelize(`data ${param}`),
    error: tools.camelize(`error ${param}`),
    pending: tools.camelize(`pending ${param}`),
    deleting: tools.camelize(`deleting ${param}`),
    pagination: tools.camelize(`pagination ${param}`)
  }
}
