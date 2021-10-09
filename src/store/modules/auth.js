import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { clearStorage } from '../../helpers/localStorage.helper';

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
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      commit('setUser', new User(user.uid));
    },

    async loginUser({ commit }, { email, password }) {
      const auth = getAuth();

      const { user } = await signInWithEmailAndPassword(auth, email, password);

      commit('setUser', new User(user.uid));
      commit('setEmail', email);
    },

    async resetPassword(_, email) {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    },

    async logoutUser({ commit }) {
      const auth = getAuth();

      await signOut(auth);

      commit('setUser', null);
      commit('setToken', {
        accessToken: '',
        refreshToken: '',
        expDate: null,
      });
      commit('setEmail', '');

      clearStorage();
    },
  },
};
