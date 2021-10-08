import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import router from '@/router.js'


Vue.use(Vuex)
var plugins = process.env.VUE_APP_DEBUG === 'true' ? [] : [createPersistedState({ key: HASH })]

export default new Vuex.Store({
  state: {
    token: '',
    sidebar: true,
    notificationType: '',
    notificationText: '',
    goalFilters: {
      hideInactive: false,
      search: '',
    },
    inputInfo: {
      name: '',
      items: [],
      name_singular: '',

    },
  },
  mutations: {
    notify(state, data) {
    },
    setSites(state, data) {
      state.sites = data
    },
    setSidebar(state, data) {
    },
    setSearch(state, value) {
      state.goalFilters.search = value
    },
    setInactiveSwitch(state, value) {
      state.goalFilters.hideInactive = value

    },
    setCurrentInputs(state, data) {
      state.inputInfo = data
    },
    login(state, data) {
      state.token = data.token
      state.user = data.user
      state.company = data.company
      state.activePage = '/inputs/sites'
    },
    updateAuthHeader(state, token) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
  },
  actions: {
    login: function(state, data) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      this.commit('login', data)
      router.push({ path: '/' })
    },
    signup: function(state, data) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      this.commit('login', data)
      router.push({ path: '/getting-started' })
    },
    getInputs: function(state, type) {
      Vue.prototype.$http.get(`/inputs/${type}`).then((response) => {
        state.commit('setCurrentInputs', response.data)
      })
    },
  },
  modules: {
  }
})
