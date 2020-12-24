import i18n from '@/i18n';

export default {
  namespaced: true,
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
};
