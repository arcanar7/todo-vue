import { createApp } from 'vue';
import 'normalize.css';
import { initializeApp } from 'firebase/app';
import { mapState } from 'vuex';

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import './registerServiceWorker';

const commonMixin = {
  computed: {
    ...mapState('Utils', ['loading', 'isOnLine']),
    ...mapState('Lang', ['lang']),

    loadingApp() {
      return this.loading;
    },
  },
};

const app = createApp({
  ...App,
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
    initializeApp(firebaseConfig);
    i18n.global.locale = this.lang;
  },
});

app.use(i18n);
app.use(router);
app.use(store);
app.mixin(commonMixin);

app.mount('#app');
