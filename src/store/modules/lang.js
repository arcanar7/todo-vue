import i18n from '@/i18n';

export default {
  namespaced: true,
  state: {
    lang: 'en',
  },
  mutations: {
    setLang(state, payload) {
      state.lang = payload;
      i18n.locale = payload;
    },
  },
};
