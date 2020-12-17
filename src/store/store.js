import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Auth from './_auth';
import Utils from './_utils';
import Todo from './_todo';
import Lang from './_lang';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Auth, Utils, Todo, Lang },
  plugins: [createPersistedState()],
});
