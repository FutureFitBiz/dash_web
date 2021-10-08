import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        // primary: '#4d8ca4',
        primary: '#0880a6',
        secondary: '#a6d0de',
        error: '#F56C6C',
        warning : '#E6A23C',
        accent: '#3f51b5',
        info: '#2196f3',
        success:'#4CAF50'
      },
    },
  },
})

// primary: '#a6d0de',
