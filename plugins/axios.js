import Vue from 'vue'
const qs = require('qs')
// import axios from 'axios'
import * as notifyStore from '../store/notify'
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
export default function ({ $axios, redirect, $auth, app }) {
  if ($auth) {
    // If the user is logged in we can now get the token, we get something like `Bearer yourTokenJ9F0JFODJ` but we only need the string without the word **Bearer**, So we split the string using the space as a separator and we access the second position of the array **[1]**
    const token = app.$auth.strategy.token.get().split(' ')[1]
    $axios.setToken(token, 'Bearer') // Here we specify the token and now it works!!
  }
  $axios.setBaseURL(process.env.VUE_APP_BASE_URL)

  // $axios.onRequest((config) => {
  //   config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' })
  //   return config
  // })
  $axios.onError((error) => {
    if (error.response && error.response.status === 400) {
      Vue.prototype.$snotify.error(error.response.data.data[0].messages[0].message)
      return
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('local')
      localStorage.removeItem('user_info');
      app.$auth.logout()
      Vue.prototype.$snotify.error('Not Authenticated: Sorry, you have to be logged in to access this!')
      return
    }
    if (error.response && error.response.status === 403) {
      Vue.prototype.$snotify.error('Not Authorized: Sorry, you can\'t access this!')
      return
    }
    if (error.response && error.response.status === 404) {
      Vue.prototype.$snotify.error('Not Found: We couldn\'t find what you\'re looking for. Please refresh and try again, or contact the support team.')
      return
    }
    if (error.response && error.response.status === 422) {
      Vue.prototype.$snotify.error('Validation Error')
      return
    }
    if (error.response && error.response.status === 500) {
      Vue.prototype.$snotify.error('Server Error: Please contact the support team.')
      return
    }
    if (error.message === 'Network Error') {
      Vue.prototype.$snotify.error('Network Error: Check your network')
    }
  })
}
// const init = {
//   request (method, url, params, data) {
//     const config = {
//       // baseURL: process.env.VUE_APP_BASE_URL,
//       baseURL: 'https://agromart.cookzy.uz/api/v1',
//       timeout: 10000,
//       url,
//       method,
//       onUploadProgress (e) {
//         Math.round((e.loaded * 100) / e.total)
//       }
//     }
//     if (Vue.prototype.$auth.loggedIn) {
//       config.headers = {
//         Authorization:
//         'Bearer ' + (Vue.prototype.$auth.strategy.token.get())
//       }
//     }
//     if (data) { config.data = data }
//     if (params) { config.params = params }
//     const result = axios(config)
//     return new Promise((resolve, reject) => {
//       result
//         .then((res) => {
//           resolve(res.data)
//         })
//         .catch((error) => {
//           ErrorHandler(error)
//           reject(error)
//         })
//     })
//   },
//   get (url, params) {
//     return this.request('GET', url, params, undefined)
//   },
//   post (url, data, params) {
//     return this.request('POST', url, params, data)
//   },
//   put (url, data, params) {
//     return this.request('PUT', url, params, data)
//   },
//   remove (url, params) {
//     return this.request('DELETE', url, params, undefined)
//   }
// }

// export default init
