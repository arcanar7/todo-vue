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
    token: '',
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('clearSuccess')
      commit('setLoading', true)
      try {
        const user = await fetch('http://localhost:8081/auth/register', {
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
        const user = await fetch('http://localhost:8081/auth/login', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }).then(res => res.json())
        // const user = await fb.auth().signInWithEmailAndPassword(email, password)
        if (user.message) throw new Error(user.message)
        console.log(user)
        commit('setToken', user.token)
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
        commit('setEmail', '')
        commit('setToken', '')
        // fb.auth().signOut()
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
    token(state) {
      return state.token
    },
  },
}
