import fb from 'firebase/app';
import 'firebase/auth';
import { clearStorage } from '@/helpers/localStorage.helper';
// import { CONTENT_TYPES } from './constants';

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  namespaced: true,
  state: {
    user: null,
    email: '',
    tokens: {
      accessToken: '',
      refreshToken: '',
      expDate: null,
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    },
    setToken(state, { accessToken, refreshToken, expDate }) {
      state.tokens = {
        accessToken,
        refreshToken,
        expDate,
      };
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      // const user = await fetch(`${process.env.VUE_APP_api}auth/register`, {
      //   method: 'post',
      //   headers: { 'Content-Type': CONTENT_TYPES.application },
      //   body: JSON.stringify({ email, password }),
      // }).then((res) => res.json());
      const user = await fb.auth().createUserWithEmailAndPassword(email, password);
      // if (user.message) {
      //   throw new Error(user.message);
      // }
      commit('setUser', new User(user.uid));
    },
    async loginUser({ commit }, { email, password }) {
      // const user = await fetch(`${process.env.VUE_APP_api}auth/login`, {
      //   method: 'post',
      //   headers: { 'Content-Type': CONTENT_TYPES.application },
      //   body: JSON.stringify({ email, password }),
      // }).then((res) => res.json());
      const { user } = await fb.auth().signInWithEmailAndPassword(email, password);
      // if (user.message) {
      //   throw new Error(user.message);
      // }
      // commit('setToken', user);
      commit('setUser', new User(user.uid));
      commit('setEmail', email);
    },
    async resetPassword(_, email) {
      await fb.auth().sendPasswordResetEmail(email);
    },
    logoutUser({ commit }) {
      commit('setUser', null);
      commit('setToken', {
        accessToken: '',
        refreshToken: '',
        expDate: null,
      });
      commit('setEmail', '');
      clearStorage();
      fb.auth().signOut();
    },
  },
};
