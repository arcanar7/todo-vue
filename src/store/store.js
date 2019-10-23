import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './_auth'
import Utils from './_utils'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { Auth, Utils },
})
