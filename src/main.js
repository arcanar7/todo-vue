import Vue from 'vue'
import 'normalize.css'
import Vuelidate from 'vuelidate'
import fb from 'firebase/app'

import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'

Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.mixin({
  computed: {
    loadingApp() {
      return this.$store.getters.loading
    },
    localLoading() {
      return this.$store.getters.localLoading
    },
  },
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let firebaseConfig = {
      apiKey: process.env.VUE_APP_apiKey,
      authDomain: process.env.VUE_APP_authDomain,
      databaseURL: process.env.VUE_APP_databaseURL,
      projectId: process.env.VUE_APP_projectId,
      storageBucket: process.env.VUE_APP_storageBucket,
      messagingSenderId: process.env.VUE_APP_messagingSenderId,
      appId: process.env.VUE_APP_appId,
      measurementId: process.env.VUE_APP_measurementId,
    }
    fb.initializeApp(firebaseConfig)
  },
}).$mount('#app')
