import constants from '~/utils/constants'
import tools from '~/utils/tools'
import __ from 'lodash'
import moment from "moment";
import Vue from "vue";
import i18n from "~/utils/i18n";
export const state = () => ({
    results: []
})

export const mutations = {
    SET_RESULTS(state, payload) {
        state.results = payload
    }
}

export const actions = {
    async planetSearch({ commit }, payload) {
        const _result = await this.$axios.$post('/planetsearches/search?key=b829bd7101e040589968b9981b442b1e', {
            item_types: ['PSScene'],
            field: payload.field,
            cloud_range: 1,
            date_to: payload.date_to,
            date_from: payload.date_from,
            user: payload.user
        })
        const _features = __.uniqBy(_result.data.res.features.map(e => {
            return {
                ...e,
                date: moment(e.properties.published).format('YYYY-MM-DD')
            }
        }), 'date')
        commit('SET_RESULTS', _features)
        return _result
    },
    async planetOrder ({ commit, dispatch }, payload) {
        try {
          const _result = await this.$axios.$post('/planet_order?key=b829bd7101e040589968b9981b442b1e', payload)
          Vue.prototype.$snotify.warning('Буюртмангиз юборилди.  Илтимос,  5-10 дақиқа кутинг.')
          return _result
        } catch (e) {
          console.log("Errorrrrr", e)
        }
      },
    async getPlanetOrder({ commit }, params) {
        console.log("getPlanetOrder", params)
        const _result = await this.$axios.$get('/get_planet_order', { params })
        return _result
    },
    async checkStatus ({ }, id) {
        const _res = await this.$axios.$get(`check_order/${id}`, { params: { key: 'b829bd7101e040589968b9981b442b1e' } })
        return _res
    }
}

export const getters = {
    planetSearchResults: state => state.results
}
