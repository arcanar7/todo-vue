import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Auth from '@/store/modules/auth';
import Utils from '@/store/modules/utils';
import Todo from '@/store/modules/todo';
import Lang from '@/store/modules/lang';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Auth, Utils, Todo, Lang },
  plugins: [createPersistedState()],
});
