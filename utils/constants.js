import Vue from 'vue'
import client from '~/assets/icons/svg/client.svg'
import chef from '~/assets/icons/svg/chef.svg'
import empty from '~/assets/icons/svg/empty.svg'

const constants = {
  mapCenter: [41.312947, 69.280204],
  icons: {
    client,
    chef,
    empty
  },
  defaultMap: {
    api: 'https://api-maps.yandex.ru/2.1/?apikey=8fb635ed-f033-4166-8286-a5388bb7d9a9&lang=ru_RU',
    // apiKey: '8fb635ed-f033-4166-8286-a5388bb7d9a9',
    center: [41.312947, 69.280204],
    home: [41.324174, 69.290130]
  },
  query: {
    limit: 12,
    offset: 0,
    category_id: null,
    posttype: null,
    hasdelivery: null,
    price_lte: null,
    price_gte: null,
    change_from: null,
    search: null
  }
}

export default constants
Vue.prototype.$const = constants
