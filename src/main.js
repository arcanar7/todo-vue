import Vue from 'vue';
import 'normalize.css';
import fb from 'firebase/app';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import i18n from '@/i18n';
import { mapState } from 'vuex';

Vue.config.productionTip = false;

const mixin = {
  computed: {
    ...mapState('Utils', ['loading', 'isOnLine']),
    ...mapState('Lang', ['lang']),

    loadingApp() {
      return this.loading;
    },
  },
};

Vue.mixin(mixin);

new Vue({
  router,
  store,
  render: (h) => h(App),
  i18n,

  created() {
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_apiKey,
      authDomain: process.env.VUE_APP_authDomain,
      databaseURL: process.env.VUE_APP_databaseURL,
      projectId: process.env.VUE_APP_projectId,
      storageBucket: process.env.VUE_APP_storageBucket,
      messagingSenderId: process.env.VUE_APP_messagingSenderId,
      appId: process.env.VUE_APP_appId,
      measurementId: process.env.VUE_APP_measurementId,
    };
    fb.initializeApp(firebaseConfig);
    i18n.locale = this.lang;
  },
}).$mount('#app');
