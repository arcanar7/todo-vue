export default {
  state: {
    lang: 'en',
  },
  mutations: {
    SET_LANG(state, payload) {
      state.lang = payload
    },
  },
  actions: {
    setLang({ commit }, payload) {
      commit('SET_LANG', payload)
    },
  },
  getters: {
    lang(state) {
      return state.lang
    },
  },
}
