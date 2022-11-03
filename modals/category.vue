<template>
  <div>
    <div class="flex flex-shrink-0 w-full">
      <div class="flex flex-col w-full">
        <div class="flex  flex-col h-0 flex-1">
          <div class="flex-1 flex flex-col overflow-y-auto w-full">
            <nav class="flex-1 bg-white px-2 ">
              <div
                class="cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                :class="locale.current ? 'text-green-600 hover:text-green-600' : 'text-gray-500 hover:text-gray-700'"
                @click="menuClicked(locale); onClose('canceled')"
              >
                {{ $t(locale.name[$i18n.locale]) }}
              </div>
              <div v-for="(item, key) in sidebar" :key="key" class="border-b border-gray-200">
                <div v-if="item.childs.length > 0">
                  <div class="flex cursor-pointer justify-between" @click="menuWithChildClicked(item); onClose('canceled')">
                    <a
                      class="cursor-pointer group flex items-center px-2 py-2.5 text-sm font-medium rounded-md"
                      :class="item.current ? 'text-green-600 hover:text-green-600' : 'text-gray-500 hover:text-gray-700'"
                    >
                      {{ item.name[$i18n.locale] }}
                    </a>
                    <div class="flex cursor-pointer justify-end items-center">
                      <font-awesome-icon
                        class="mx-4 h-4 w-4"
                        :class="item.current ? 'text-green-600 hover:text-green-600' : 'text-gray-500 hover:text-gray-700'"
                        :icon="item.current ? 'chevron-up' : 'chevron-down'"
                      />
                    </div>
                  </div>
                  <div v-for="(child, k) in item.childs" v-show="item.current === true" :key="k">
                    <a
                      :to="child.route"
                      class="cursor-pointer ml-10 group flex items-center px-2 py-2.5 text-sm font-medium rounded-md"
                      :class="child.current ? 'text-green-600 hover:text-green-600' : 'text-gray-500 hover:text-gray-700'"
                      @click="menuChildClicked(item, child); onClose('canceled')"
                    >
                      {{ child.name[$i18n.locale] }}
                    </a>
                  </div>
                </div>
                <div
                  v-else
                  class="cursor-pointer group flex items-center px-2 py-2.5 text-sm font-medium rounded-md"
                  :class="item.current ? 'text-green-600 hover:text-green-600' : 'text-gray-500 hover:text-gray-700'"
                  @click="menuClicked(item); onClose('canceled')"
                >
                  {{ item.name[$i18n.locale] }}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Category',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      locale: {
        created_at: '2021-11-11T23:25:16.744559+05:00',
        id: 'all',
        name: { uz: 'word.all', ru: 'Все', en: 'All' },
        childs: [],
        current: false,
        status: true,
        updated_at: '2021-11-11T23:25:16.744646+05:00'
      }
    }
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar/getSidebar'
    })
  },
  mounted () {
    if (this.$route.path.length <= (this.name.length + 2) || this.$route.path.search('all') > -1) {
      this.menuClicked(this.locale)
    }
  },
  methods: {
    showHideMenu () {
      this.showMenuInMobile = !this.showMenuInMobile
    },
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('sign-in', e)
    },
    menuChildClicked (item, child) {
      const sidebar = [...this.sidebar]
      sidebar.forEach((el) => {
        if (el.id === item.id) {
          return item.childs.forEach((ch) => {
            if (child === ch) {
              ch.current = true
            } else {
              ch.current = false
            }
            this.locale.current = false
          })
        }
      })
      this.$store.dispatch('sidebar/changeSidebar', sidebar)
      this.$router.push({
        path: this.localePath(`${this.$route.path.slice(0, this.name.length + 1)}/${child.id}`),
        query: this.checkQuery(child)
      })
    },
    menuWithChildClicked (item) {
      const sidebar = [...this.sidebar]
      sidebar.forEach((menu) => {
        if (menu.id === item.id) {
          menu.current = !menu.current
          menu.childs.forEach((child) => {
            child.current = false
          })
        } else {
          menu.current = false
        }
      })
      this.locale.current = false
      this.$store.dispatch('sidebar/changeSidebar', sidebar)
    },
    menuClicked (item) {
      const sidebar = [...this.sidebar]
      if (item.id === 'all') {
        this.locale.current = !this.locale.current
      }
      sidebar.forEach((menu) => {
        if (item === menu) {
          menu.current = item.id !== 'all'
        } else {
          menu.current = false
        }
      })
      this.$store.dispatch('sidebar/changeSidebar', sidebar)
      this.$router.push({
        path: this.localePath(`${this.$route.path.slice(0, this.name.length + 1)}`),
        query: this.checkQuery(item)
      })
    },
    checkQuery (item) {
      if (item.id === 'all') {
        return {
          limit: this.$route.query.limit ? this.$route.query.limit : 12,
          offset: this.$route.query.offset ? this.$route.query.offset : 1
        }
      }
      return {
        category_id: item.id,
        limit: 12,
        offset: 1
      }
    }
  }
}
</script>
