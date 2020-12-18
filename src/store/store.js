import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Auth from './auth';
import Utils from './utils';
import Todo from './todo';
import Lang from './lang';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Auth, Utils, Todo, Lang },
  plugins: [createPersistedState()],
});
