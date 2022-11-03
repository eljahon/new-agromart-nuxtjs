<template>
  <div>
    <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
      <div v-for="(info, index) in information" :key="index">
        <div v-show="info.title[$i18n.locale] !== 'None'" class="col-span-3 h-auto p-2 bg-white rounded-md hover:shadow-lg shadow-md border">
          <router-link :to="{ path: localePath(`/useful-information/${info.id}`), query: {id: info.id}}">
            <div class="grid grid-cols-3">
              <div class="">
                <img v-if="info.thumbnail || info.mainphoto" :src="$tools.getFileUrl(info.thumbnail ? info.thumbnail : info.mainphoto)" class="w-40 h-28 object-cover shadow-lg rounded-md">
                <img v-else-if="info.gallery.length > 0" :src="$tools.getFileUrl(info.gallery[0].url)" class="w-40 h-28 object-cover shadow-lg rounded-md">
                <img
                  v-else
                  class="w-40 h-28 object-cover shadow-lg rounded-md"
                  src="https://www.pinupacc.com/images/dummy.png"
                >
              </div>
              <div class="col-span-2 px-3">
                <h3 class="text-gray-600 line-clamp-2 font-medium text-sm">
                  {{ info.title[$i18n.locale] }}
                </h3>
                <div v-if="info.consultantid !== null" class="mt-4 flex items-center">
                  <div class="flex-shrink-0">
                    <img v-if="info.consultantid.avatar === null" src="https://silkozari.com/web/images/miscellaneous/avatar.jpg" class="h-10 w-10 rounded-full">
                    <img v-else class="h-10 w-10 object-cover rounded-full" :src="$tools.getFileUrl(info.consultantid.avatar)">
                  </div>
                  <div class="ml-3">
                    <p v-if="info.consultantid !== null" class="text-sm text-gray-600">
                      {{ `${info.consultantid.name ? info.consultantid.name : ''} ${info.consultantid.surname ? info.consultantid.surname : ''}` }}
                    </p>
                    <div class="flex space-x-1 text-xs text-gray-500">
                      <time datetime="2020-03-16">
                        {{ $tools.getDate(info.created_at) }}
                      </time>
                    </div>
                  </div>
                </div>
                <p v-if="info.categoryid" class="text-green-500 line-clamp-1 text-xs pt-1">
                  {{ info.categoryid.title[$i18n.locale] }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <pagination
      v-if="pagination.pageCount > 1"
      :current-page="parseInt($route.query.offset)"
      :page-count="pagination.pageCount"
      @callback="pageChanged($event)"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  auth: false,
  data () {
    return {
      information: [],
      query: {
        limit: 12,
        offset: 1
      }
    }
  },
  computed: {
    pagination () {
      return this.$store.state.crud.usefulInfo.pagination
    },
    ...mapState({})
  },
  watch: {
    '$route.query.offset' () {
      if (this.$route.query.offset) { this.fetchData(this.$route.query) }
    },
    '$route.query.category_id' () {
      if (this.$route.query.category_id) { this.fetchData(this.$route.query) }
    },
    '$i18n.locale' () {
      this.fetchData(this.$route.query)
    }
  },
  mounted () {
    this.fetchData(Object.keys(this.$route.query).length > 0
      ? {
          category_id: this.$route.query.category_id,
          limit: this.$route.query.limit,
          offset: this.$route.query.offset
        }
      : {
          category_id: 'all',
          limit: this.pagination.limit,
          offset: this.pagination.page
        })
  },
  methods: {
    pageChanged (offset) {
      this.$router.push({
        path: this.localePath(this.$route.query.path),
        query: this.setQuery(this.$route.query, offset)
      })
    },
    setQuery (query, offset) {
      if (query.category_id) {
        return {
          category_id: query.category_id,
          limit: query.limit ? query.limit : this.pagination.limit,
          offset
        }
      }
      return {
        limit: query.limit ? query.limit : this.pagination.limit,
        offset
      }
    },
    fetchData (query) {
      this.$store.dispatch('crud/usefulInfo/getUsefulInformation',
        {
          locale: this.$i18n.locale,
          query: {
            _sort: 'created_at:DESC',
            '_where[0][categoryid.id]': query.category_id !== 'all' ? query.category_id : null,
            _limit: query.limit,
            _start: (query.offset - 1) * query.limit
          }
        }).then((res) => {
        this.information = res
      })
    }
  }
}
</script>
