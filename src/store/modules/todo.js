import fb from 'firebase/app';
import 'firebase/database';
// import fetchWithAuth from '../api/jwt-refresh';
// import { CONTENT_TYPES, METHODS } from './constants';

class Todo {
  constructor(title, completed = false, id = null) {
    this.title = title;
    this.completed = completed;
    this.id = id;
  }
}

export default {
  namespaced: true,
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
    clearTodos({ commit }) {
      commit('loadTodos', []);
    },
    async createTodo({ commit, rootState }, { title }) {
      const newTodo = new Todo(title);
      // const todo = await fetchWithAuth(`${process.env.VUE_APP_api}todo`, {
      //   method: METHODS.post,
      //   headers: {
      //     'Content-Type': CONTENT_TYPES.application,
      //     Authorization: `Bearer ${getters.token}`,
      //   },
      //   body: JSON.stringify({ title }),
      // }).then((res) => res.json());
      const todo = await fb
        .database()
        .ref(rootState.Auth.user.id)
        .push(newTodo);
      // if (todo.message) throw new Error(todo.message);
      // commit('createTodo', new Todo(title, false, todo._id));
      commit('createTodo', { ...newTodo, id: todo.key });
    },
    async fetchTodos({ commit, rootState }) {
      commit('beforeEditTitle', '');
      const resultTodos = [];

      // const todos = await fetchWithAuth(`${process.env.VUE_APP_api}todo`, {
      //   method: METHODS.get,
      //   headers: {
      //     'Content-Type': CONTENT_TYPES.application,
      //     Authorization: `Bearer ${getters.accessToken}`,
      //   },
      // }).then((res) => res.json());
      const fbVal = await fb
        .database()
        .ref(rootState.Auth.user.id)
        .once('value');
      const todos = fbVal.val();
      // if (todos.message) throw new Error(todos.message);
      if (todos) {
        Object.keys(todos).forEach((key) => {
          const todo = todos[key];
          resultTodos.push(new Todo(todo.title, todo.completed, key));
        });
      }
      commit('loadTodos', resultTodos);
    },
    async updateTodo({ commit, rootState }, { title, completed, id }) {
      // const todo = await fetchWithAuth(`${process.env.VUE_APP_api}todo/${id}`, {
      //   method: METHODS.put,
      //   headers: {
      //     'Content-Type': CONTENT_TYPES.application,
      //     Authorization: `Bearer ${getters.accessToken}`,
      //   },
      //   body: JSON.stringify({ title, completed }),
      // }).then((res) => res.json());
      await fb
        .database()
        .ref(rootState.Auth.user.id)
        .child(id)
        .update({ title, completed });
      // if (todo.message) throw new Error(todo.message);
      commit('updateTodo', { title, completed, id });
    },
    async removeTodo({ commit, rootState }, id) {
      // const todo = await fetchWithAuth(`${process.env.VUE_APP_api}todo/${id}`, {
      //   method: METHODS.delete,
      //   headers: {
      //     'Content-Type': CONTENT_TYPES.application,
      //     Authorization: `Bearer ${getters.accessToken}`,
      //   },
      // }).then((res) => res.json());
      await fb
        .database()
        .ref(rootState.Auth.user.id)
        .child(id)
        .remove();
      // if (todo.message) throw new Error(todo.message);
      commit('removeTodo', id);
    },
    async deleteCompleted({ state, commit, rootState }) {
      const { id } = rootState.Auth.user;
      const { todos } = state;
      const ref = fb.database().ref(id);

      const updates = todos.reduce((acc, item) => {
        if (item.completed) {
          acc[item.id] = null;
        }
        return acc;
      }, {});
      await ref.update(updates);
      commit('deleteCompleted');
      // const todo = await fetchWithAuth(`${process.env.VUE_APP_api}todo`, {
      //   method: METHODS.delete,
      //   headers: {
      //     'Content-Type': CONTENT_TYPES.application,
      //     Authorization: `Bearer ${getters.accessToken}`,
      //   },
      //   body: JSON.stringify({ id }),
      // }).then((res) => res.json());
      // if (todo.message) throw new Error(todo.message);
    },
  },
};
