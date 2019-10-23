import Vue from 'vue'
import 'normalize.css'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router/router'
import store from './store'
import './registerServiceWorker'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
