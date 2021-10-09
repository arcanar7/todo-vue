import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Auth from './modules/auth';
import Utils from './modules/utils';
import Todo from './modules/todo';
import Lang from './modules/lang';

export default createStore({
  modules: { Auth, Utils, Todo, Lang },
  plugins: [createPersistedState()],
});
