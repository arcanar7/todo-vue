import fb from 'firebase/app'
import 'firebase/database'

class Todo {
  constructor(title, completed = false, id = null) {
    this.title = title
    this.completed = completed
    this.id = id
  }
}

export default {
  state: {
    todos: [],
    visibility: 'all',
    editedTodo: null,
    beforeEditTitle: '',
  },
  mutations: {
    setVisibility(state, payload) {
      state.visibility = payload
    },
    createTodo(state, payload) {
      state.todos.push(payload)
    },
    loadTodos(state, payload) {
      state.todos = payload
    },
    updateTodo(state, { title, completed, id }) {
      const todo = state.todos.find(t => {
        return t.id === id
      })
      todo.title = title
      todo.completed = completed
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(todo => {
        return todo.id !== id
      })
    },
    editTodo(state, payload) {
      state.editedTodo = payload
    },
    beforeEditTitle(state, payload) {
      state.beforeEditTitle = payload
    },
  },
  actions: {
    setVisibility({ commit }, payload) {
      commit('setVisibility', payload)
    },
    clearTodos({ commit }) {
      commit('loadTodos', [])
    },
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
      if (getters.isOnLine) {
        commit('clearError')
        commit('setLoading', true)
        const resultTodos = []
        try {
          const fbVal = await fb
            .database()
            .ref(getters.user.id)
            .once('value')
          const todos = fbVal.val()
          if (todos) {
            Object.keys(todos).forEach(key => {
              const todo = todos[key]
              resultTodos.push(new Todo(todo.title, todo.completed, key))
            })
          }
          commit('loadTodos', resultTodos)
          commit('setLoading', false)
        } catch (error) {
          commit('setError', error.message)
          commit('setLoading', false)
          throw error
        }
      }
    },
    async updateTodo({ commit, getters }, { title, completed, id }) {
      commit('clearError')
      try {
        await fb
          .database()
          .ref(getters.user.id)
          .child(id)
          .update({ title, completed })
        commit('updateTodo', { title, completed, id })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async removeTodo({ commit, getters }, id) {
      commit('clearError')
      try {
        await fb
          .database()
          .ref(getters.user.id)
          .child(id)
          .remove()
        commit('removeTodo', id)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    editTodo({ commit }, payload) {
      commit('editTodo', payload)
    },
    beforeEditTitle({ commit }, payload) {
      commit('beforeEditTitle', payload)
    },
  },
  getters: {
    todos(state) {
      return state.todos
    },
    visibility(state) {
      return state.visibility
    },
    editedTodo(state) {
      return state.editedTodo
    },
    beforeEditTitle(state) {
      return state.beforeEditTitle
    },
  },
}
