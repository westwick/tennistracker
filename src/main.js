import Vue from 'vue'
import Vuetify from 'vuetify';
import App from './App.vue'
import router from './router'
import VueFirestore from 'vue-firestore'

Vue.use(Vuetify, {
  theme: {
    primary: '#66bb6a',
    secondary: '#338a3e'
  }
})

Vue.use(VueFirestore)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
