import { child, get, getDatabase, push, ref, remove, update } from 'firebase/database';

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
  },
  actions: {
    clearTodos({ commit }) {
      commit('loadTodos', []);
    },

    async createTodo({ commit, rootState }, { title }) {
      const newTodo = new Todo(title);
      const dbRef = ref(getDatabase(), rootState.Auth.user.id);
      const todo = await push(dbRef, newTodo);

      commit('createTodo', { ...newTodo, id: todo.key });
    },

    async fetchTodos({ commit, rootState }) {
      const resultTodos = [];
      const dbRef = ref(getDatabase(), rootState.Auth.user.id);

      get(dbRef).then((snapshot) => {
        if (!snapshot.exists()) {
          return;
        }

        const todos = snapshot.val();

        Object.keys(todos).forEach((key) => {
          const todo = todos[key];
          resultTodos.push(new Todo(todo.title, todo.completed, key));
        });

        commit('loadTodos', resultTodos);
      });
    },

    async updateTodo({ commit, rootState }, { title, completed, id }) {
      const dbRef = ref(getDatabase(), rootState.Auth.user.id);

      await update(child(dbRef, id), { title, completed });

      commit('updateTodo', { title, completed, id });
    },
    async removeTodo({ commit, rootState }, id) {
      const dbRef = ref(getDatabase(), rootState.Auth.user.id);

      await remove(child(dbRef, id));

      commit('removeTodo', id);
    },
    async deleteCompleted({ state, commit, rootState }) {
      const { todos } = state;
      const dbRef = ref(getDatabase(), rootState.Auth.user.id);
      const updates = todos.reduce((acc, item) => {
        if (item.completed) {
          acc[item.id] = null;
        }
        return acc;
      }, {});

      await update(dbRef, updates);
      commit('deleteCompleted');
    },
  },
  getters: {
    editedTodoId(state) {
      return state.editedTodo?.id;
    },
  },
};
