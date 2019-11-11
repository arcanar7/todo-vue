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
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('clearSuccess')
      commit('setLoading', true)
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit('clearError')
      commit('clearSuccess')
      commit('setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setEmail', email)
        commit('loadTodos', [])
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async resetPassword({ commit }, email) {
      commit('clearError')
      commit('clearSuccess')
      commit('setLoading', true)
      try {
        await fb.auth().sendPasswordResetEmail(email)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    logoutUser({ commit }) {
      try {
        fb.auth().signOut()
        commit('setUser', null)
        commit('setEmail', '')
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    email(state) {
      return state.email
    },
  },
}
