import fb from 'firebase/app'
import 'firebase/auth'

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
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
      state.user = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
    setToken(state, payload) {
      state.tokens.accessToken = payload.newAccessToken
      state.tokens.refreshToken = payload.newRefreshToken
      state.tokens.expDate = payload.expDate
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('clearSuccess')
      commit('setLoading', true)
      try {
        const user = await fetch(`${process.env.VUE_APP_api}auth/register`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }).then(res => res.json())
        // const user = await fb
        //   .auth()
        //   .createUserWithEmailAndPassword(email, password)
        if (user.message) throw new Error(user.message)
        commit('setUser', new User(user.uid))
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit('clearError')
      commit('clearSuccess')
      commit('setLoading', true)
      try {
        const user = await fetch(`${process.env.VUE_APP_api}auth/login`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }).then(res => res.json())
        // const user = await fb.auth().signInWithEmailAndPassword(email, password)
        if (user.message) throw new Error(user.message)
        commit('setToken', user)
        commit('setUser', new User(user.uid))
        commit('setEmail', email)
        commit('loadTodos', [])
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },
    async resetPassword({ commit }, email) {
      commit('clearError')
      commit('clearSuccess')
      commit('setLoading', true)
      try {
        await fb.auth().sendPasswordResetEmail(email)
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },
    logoutUser({ commit }) {
      try {
        commit('setUser', null)
        commit('setToken', {
          newAccessToken: '',
          newRefreshToken: '',
          expDate: null,
        })
        commit('setEmail', '')
        // fb.auth().signOut()
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    setToken({ commit }, payload) {
      commit('setToken', payload)
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    email(state) {
      return state.email
    },
    accessToken(state) {
      return state.tokens.accessToken
    },
    refreshToken(state) {
      return state.tokens.refreshToken
    },
    expDate(state) {
      return state.tokens.expDate
    },
    tokens(state) {
      return state.tokens
    },
  },
}
