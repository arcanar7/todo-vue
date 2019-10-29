import fb from 'firebase/app'
import 'firebase/database'

class Todo {
  constructor(title, complited = false, id = null) {
    this.title = title
    this.complited = complited
    this.id = id
  }
}

export default {
  state: {
    todos: [],
  },
  mutations: {
    createTodo(state, payload) {
      state.todos.push(payload)
    },
    loadTodos(state, payload) {
      state.todos = payload
    },
    updateTodo(state, { title, complited, id }) {
      const todo = state.todos.find(t => {
        return t.id === id
      })
      todo.title = title
      todo.complited = complited
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(todo => {
        return todo.id !== id
      })
    },
  },
  actions: {
    async createTodo({ commit, getters }, { title }) {
      commit('clearError')
      commit('setLocalLoading', true)
      try {
        const newTodo = new Todo(title)
        const todo = await fb
          .database()
          .ref(getters.user.id)
          .push(newTodo)
        commit('createTodo', { ...newTodo, id: todo.key })
        commit('setLocalLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLocalLoading', false)
        throw error
      }
    },
    async fetchTodos({ commit, getters }) {
      commit('clearError')
      commit('setLoading', true)
      const resultTodos = []
      try {
        const fbVal = await fb
          .database()
          .ref(getters.user.id)
          .once('value')
        const todos = fbVal.val()
        Object.keys(todos).forEach(key => {
          const todo = todos[key]
          resultTodos.push(new Todo(todo.title, todo.complited, key))
        })
        commit('loadTodos', resultTodos)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateTodo({ commit, getters }, { title, complited, id }) {
      commit('clearError')
      // commit('setLoading', true)
      try {
        await fb
          .database()
          .ref(getters.user.id)
          .child(id)
          .update({ title, complited })
        commit('updateTodo', { title, complited, id })
        // commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        // commit('setLoading', false)
        throw error
      }
    },
    async removeTodo({ commit, getters }, id) {
      commit('clearError')
      // commit('setLocalLoading', true)
      try {
        await fb
          .database()
          .ref(getters.user.id)
          .child(id)
          .remove()
        commit('removeTodo', id)
        // commit('setLocalLoading', false)
      } catch (error) {
        commit('setError', error.message)
        // commit('setLocalLoading', false)
        throw error
      }
    },
  },
  getters: {
    todos(state) {
      return state.todos
    },
    // promoAds(state) {
    //   return state.ads.filter(ad => {
    //     return ad.promo
    //   })
    // },
    // myTodos(state, getters) {
    //   return state.todos.filter(todo => {
    //     return todo.ownerId === getters.user.id
    //   })
    // },
    // adById(state) {
    //   return adId => {
    //     return state.ads.find(ad => ad.id === adId)
    //   }
    // },
  },
}
