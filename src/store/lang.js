import i18n from '@/i18n';

export default {
  state: {
    lang: 'en',
    langTitle: 'English',
  },
  mutations: {
    setLang(state, { val, title }) {
      state.lang = val;
      state.langTitle = title;
      i18n.locale = val;
    },
  },
  actions: {
    setLang({ commit }, payload) {
      commit('setLang', payload);
    },
  },
  getters: {
    lang(state) {
      return state.lang;
    },
    langTitle(state) {
      return state.langTitle;
    },
  },
};
