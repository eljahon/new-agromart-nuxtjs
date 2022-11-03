import Vue from 'vue'
import axios from 'axios'
import * as notifyStore from '../store/notify'
const qs = require('qs')
// import i18n from '../locales/i18n'

function unauthorized (msg) {
  errorNotification('Unauthorized', msg)
}

function errorNotification (title, msg) {
  notifyStore.actions.errorAlert(msg)
}

function ErrorHandler (error) {
  if (error.message.startsWith('timeout')) {
    errorNotification('timeout')
  }
  if (error.response) {
    const _error = error.response.data
    switch (error.response.status) {
      case 400:
        errorNotification('bad_request', _error)
        break
      case 401:
        unauthorized(_error)
        break
      case 403:
        errorNotification('Forbidden', _error.message)
        break
      case 404:
        errorNotification('Not found', _error.message)
        break
      case 422:
        errorNotification('unprocessable_entity', _error.message)
        break
      case 500:
        errorNotification('internal_server_error', _error.message)
        break
      default:
        break
    }
  }
}
const init = {
  request (method, url, params, data) {
    const config = {
      // baseURL: process.env.VUE_APP_BASE_URL,
      baseURL: process.env.VUE_APP_BASE_URL,
      timeout: 50000,
      url,
      method,
      onUploadProgress (e) {
        Math.round((e.loaded * 100) / e.total)
      }
    }
    if (Vue.prototype.$auth.loggedIn) {
      config.headers = {
        Authorization:
        'Bearer ' + (Vue.prototype.$auth.strategy.token.get())
      }
    }
    if (data) { config.data = data }
    // if (params) { config.params = params }
    if (params) {
      config.params = params

      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    const result = axios(config)
    return new Promise((resolve, reject) => {
      result
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          ErrorHandler(error)
          reject(error)
        })
    })
  },
  get (url, params) {
    return this.request('GET', url, params, undefined)
  },
  post (url, data, params) {
    return this.request('POST', url, params, data)
  },
  put (url, data, params) {
    return this.request('PUT', url, params, data)
  },
  remove (url, params) {
    return this.request('DELETE', url, params, undefined)
  }
}

export default init
