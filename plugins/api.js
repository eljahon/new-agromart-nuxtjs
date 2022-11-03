export default function ({ app, $axios, $config: { baseURL } }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {}
  })
  // Set baseURL to something different
  api.setBaseURL(baseURL)

  api.onRequest((config) => {
    // const token = app.$cookies.get('token')
    // if (token) {
    //   config.headers.common['Authorization'] = `Bearer ${token}`
    // }
  })

  // Inject to context as $api
  inject('api', api)
}
