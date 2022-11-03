import i18n from './utils/i18n'
import appConfig from './app.config'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: appConfig.title,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preload',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'",
        href: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-modal.js', async: true},
    {src: '~/plugins/swiper.js',mode: 'client'},
    {src: '~/plugins/other-libraries.js', async: true},
    {src: '~/plugins/socket.client', async: true},
    {src: '~/plugins/axios.js', async: true},
    { src: '~/plugins/client-libraries', mode: 'client' , async: true},
    {src: '~/plugins/tools.js', mode: 'client', async: true},
    {src: '~/plugins/storageName.js', async: true},
    {src:'~/plugins/vee-validate', async: true},
    {src: '~/plugins/v-mask', async: true},
    {src: '~/plugins/vueAwesomeCountdown', async: true},
    {src: '~/plugins/fortawesome', async: true},
    {src: '~/plugins/other-libraries', async: true},
    {src: '~/plugins/form-components.js', async: true},
    {src: '~/utils/bridge.js', async: true},
    {src: '~/utils/constants.js',mode:'client', async: true},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      'nuxt-i18n',

      {
        vueI18nLoader: true,
        defaultLocale: 'uz',
        detectBrowserLanguage: false,
        seo: true,
        strategy: 'prefix',
        rootRedirect: 'en',
        locales: [
          {
            code: 'en',
            name: 'English',
            iso: 'en'
          },
          {
            code: 'ru',
            name: 'Русский',
            iso: 'ru'
          },
          {
            code: 'uz',
            name: 'Ўзбекча',
            iso: 'uz'
          }
        ],
        vueI18n: i18n
      }
    ],
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-fonts',
  ],

  // googleAnalytics: {
  //   id: process.env.GOOGLE_ANALYTICS_ID || 'G-4T6Y0HCCXE'
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'vue-currency-filter/nuxt',
    'cookie-universal-nuxt',
  ],

  // loading: {
  //   name: 'chasing-dots',
  //   color: '#ff5638',
  //   background: 'white',
  //   height: '4px'
  // },

  // Nuxt auth
  auth: {
    localStorage: false,
    cookie: {
      expires: 7
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 30 * 24 * 60 * 60,
          global: true,
          type: 'Bearer'
        },
        // user: {
        //   property: 'user',
        //   autoFetch: true
        // },
        endpoints: {
          login: { url: '/auth/local', method: 'post' },
          // refresh: { url: '/auth/token/refresh', method: 'post' },
          user: false,
          logout: false
          // tokenRequired: true,
          // tokenType: 'Bearer',
          // facebook: {
          //   client_id: 'your facebook app id',
          //   userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email',
          //   scope: ['public_profile', 'email']
          // },
          // google: { client_id: 'your gcloud oauth app client id' }
        },
        redirect: {
          login: '/',
          logout: '/',
          user: '/profile',
          callback: '/'
        }
      }
    }
  },

  env: {
    // baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:3000',
    WS_URL: process.env.WS_URL || 'http://localhost:3000'
  },
  axios: {
    baseURL: 'http://localhost:4000' // Used as fallback if no runtime config is provided
  },
  // sentry: {
  //   dsn: "https://7da5408ce37a4972adef0a9e5a3a4f37@o1335273.ingest.sentry.io/6621168",
  //   // publishRelease: true,
  //   // Additional Module Options go here
  //   // https://sentry.nuxtjs.org/sentry/options
  //   config: {
  //     // Add native Sentry config here
  //     // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
  //   },
  //   // tracing: true,
  //   // clientConfig: {
  //   //   beforeSend(event) {
  //   //     return event;
  //   //   },
  //   // }
  // },

  // url: 'https://7da5408ce37a4972adef0a9e5a3a4f37@o1335273.ingest.sentry.io/6621168'
  publicRuntimeConfig: {
    axios: {
      // baseURL:
      //   process.env.NODE === 'production'
      //     ? process.env.VUE_APP_BASE_URL
      //     : process.env.VUE_APP_BASE_URL
      baseURL:
        process.env.NODE === 'production'
          ? 'https://admin.agsat.uz/'
          : 'https://admin.agsat.uz/'
    },
  },

  googleFonts: {
    families: {
      Inter: [300, 400, 600, 700]
    },
    display: 'swap'
  },

  currencyFilter: {
    thousandsSeparator: ',',
    fractionCount: 0,
    fractionSeparator: '.',
    symbolSpacing: true
  },

  router: {
    // mode: 'hash',
    middleware: ['auth'],
    prefetchLinks: false
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    transpile: ['vee-validate/dist/rules'],
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
