// import fb from 'firebase/app'
// import 'firebase/database'
import fetchWithAuth from '../api/jwt-refresh';
import { CONTENT_TYPES, METHODS } from './constants';

class Todo {
  constructor(title, completed = false, id = null) {
    this.title = title;
    this.completed = completed;
    this.id = id;
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
      state.visibility = payload;
    },
    createTodo(state, payload) {
      state.todos.push(payload);
    },
    loadTodos(state, payload) {
      state.todos = payload;
    },
    updateTodo(state, { title, completed, id }) {
      const todo = state.todos.find((t) => t.id === id);
      todo.title = title;
      todo.completed = completed;
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    deleteCompleted(state) {
      state.todos = state.todos.filter((todo) => todo.completed === false);
    },
    editTodo(state, payload) {
      state.editedTodo = payload;
    },
    beforeEditTitle(state, payload) {
      state.beforeEditTitle = payload;
    },
  },
  actions: {
    setVisibility({ commit }, payload) {
      commit('setVisibility', payload);
    },
    clearTodos({ commit }) {
      commit('loadTodos', []);
    },
    async createTodo({ commit, getters }, { title }) {
      commit('clearError');
      commit('setLocalLoading', true);
      try {
        // const newTodo = new Todo(title)
        const todo = await fetchWithAuth(`${process.env.VUE_APP_api}todo`, {
          method: METHODS.post,
          headers: {
            'Content-Type': CONTENT_TYPES.application,
            Authorization: `Bearer ${getters.token}`,
          },
          body: JSON.stringify({ title }),
        }).then((res) => res.json());
        // const todo = await fb
        //   .database()
        //   .ref(getters.user.id)
        //   .push(newTodo)
        if (todo.message) throw new Error(todo.message);
        commit('createTodo', new Todo(title, false, todo._id));
        // commit('createTodo', { ...newTodo, id: todo.key })
      } catch (error) {
        commit('setError', error.message);
        throw error;
      } finally {
        commit('setLocalLoading', false);
      }
    },
    async fetchTodos({ commit, getters }) {
      if (getters.isOnLine) {
        commit('clearError');
        commit('setLoading', true);
        commit('beforeEditTitle', '');
        const resultTodos = [];
        try {
          const todos = await fetchWithAuth(`${process.env.VUE_APP_api}todo`, {
            method: METHODS.get,
            headers: {
              'Content-Type': CONTENT_TYPES.application,
              Authorization: `Bearer ${getters.accessToken}`,
            },
          }).then((res) => res.json());
          if (todos.message) throw new Error(todos.message);
          // const fbVal = await fb
          //   .database()
          //   .ref(getters.user.id)
          //   .once('value')
          // const todos = fbVal.val()
          if (todos) {
            Object.keys(todos).forEach((key) => {
              const todo = todos[key];
              resultTodos.push(new Todo(todo.title, todo.completed, todo._id));
            });
          }
          commit('loadTodos', resultTodos);
        } catch (error) {
          commit('setError', error.message);
          throw error;
        } finally {
          commit('setLoading', false);
        }
      }
    },
    async updateTodo({ commit, getters }, { title, completed, id }) {
      commit('clearError');
      try {
        const todo = await fetchWithAuth(`${process.env.VUE_APP_api}todo/${id}`, {
          method: METHODS.put,
          headers: {
            'Content-Type': CONTENT_TYPES.application,
            Authorization: `Bearer ${getters.accessToken}`,
          },
          body: JSON.stringify({ title, completed }),
        }).then((res) => res.json());
        if (todo.message) throw new Error(todo.message);
        // await fb
        //   .database()
        //   .ref(getters.user.id)
        //   .child(id)
        //   .update({ title, completed })
        commit('updateTodo', { title, completed, id });
      } catch (error) {
        commit('setError', error.message);
        throw error;
      }
    },
    async removeTodo({ commit, getters }, id) {
      commit('clearError');
      try {
        const todo = await fetchWithAuth(`${process.env.VUE_APP_api}todo/${id}`, {
          method: METHODS.delete,
          headers: {
            'Content-Type': CONTENT_TYPES.application,
            Authorization: `Bearer ${getters.accessToken}`,
          },
        }).then((res) => res.json());
        if (todo.message) throw new Error(todo.message);
        // await fb
        //   .database()
        //   .ref(getters.user.id)
        //   .child(id)
        //   .remove()
        commit('removeTodo', id);
      } catch (error) {
        commit('setError', error.message);
        throw error;
      }
    },
    async deleteCompleted({ commit, getters }) {
      commit('clearError');
      try {
        const { id } = getters.user;
        const todo = await fetchWithAuth(`${process.env.VUE_APP_api}todo`, {
          method: METHODS.delete,
          headers: {
            'Content-Type': CONTENT_TYPES.application,
            Authorization: `Bearer ${getters.accessToken}`,
          },
          body: JSON.stringify({ id }),
        }).then((res) => res.json());
        if (todo.message) throw new Error(todo.message);
        // await fb
        //   .database()
        //   .ref(getters.user.id)
        //   .child(id)
        //   .remove()
        commit('deleteCompleted');
      } catch (error) {
        commit('setError', error.message);
        throw error;
      }
    },
    editTodo({ commit }, payload) {
      commit('editTodo', payload);
    },
    beforeEditTitle({ commit }, payload) {
      commit('beforeEditTitle', payload);
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    visibility(state) {
      return state.visibility;
    },
    editedTodo(state) {
      return state.editedTodo;
    },
    beforeEditTitle(state) {
      return state.beforeEditTitle;
    },
  },
};
