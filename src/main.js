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
  },
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let firebaseConfig = {
      apiKey: 'AIzaSyC3rqNSnCeTPw27cuDVnOOuSWX_CAEh55I',
      authDomain: 'todo-29aaf.firebaseapp.com',
      databaseURL: 'https://todo-29aaf.firebaseio.com',
      projectId: 'todo-29aaf',
      storageBucket: 'todo-29aaf.appspot.com',
      messagingSenderId: '877725745417',
      appId: '1:877725745417:web:4560c406b4ced91a6453d8',
      measurementId: 'G-18Y5ZPTCHP',
    }
    fb.initializeApp(firebaseConfig)
    /* fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    }) */
    // this.$store.dispatch('fetchAds')
  },
}).$mount('#app')
