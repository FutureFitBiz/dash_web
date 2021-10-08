import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`
Vue.config.productionTip = false

Vue.use(VueEllipseProgress);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
