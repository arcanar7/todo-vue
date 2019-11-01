<template>
  <ul class="todo-list">
    <li
      v-for="todo of filteredTodos"
      class="todo"
      :class="{ editing: todo == editedTodo }"
      :key="todo.id"
    >
      <div class="todo__view">
        <div class="checkbox">
          <input
            class="toggle"
            type="checkbox"
            v-model="todo.completed"
            :id="todo.id"
            @change="onToggleComplete"
          />
          <label
            :for="todo.id"
            class="label"
            :class="{ 'color-primary': todo.completed }"
          ></label>
        </div>
        <label
          class="title"
          :class="todo.completed ? 'completed' : 'color-primary'"
          @dblclick="editTodo(todo)"
          >{{ todo.title }}</label
        >
        <button
          class="destroy"
          @click="removeTodo(todo.id)"
          title="Remove todo"
        ></button>
      </div>
      <div class="edit">
        <input
          class="edit-title"
          type="text"
          v-model="todo.title"
          v-todo-focus="todo == editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)"
        />
        <button class="edit-done" @click="doneEdit(todo)" title="Edit todo">
          <img src="@/assets/icons/edit.svg" alt="" />
        </button>
        <button
          class="edit-cancel"
          @click="cancelEdit(todo)"
          title="Cancel edit"
        >
          <img src="@/assets/icons/cancel.svg" alt="" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
const filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed)
  },
}
export default {
  props: { todos: Array },
  data() {
    return {
      editedTodo: null,
    }
  },
  methods: {
    onToggleComplete(e) {
      const { checked, id } = e.target
      this.$store.dispatch('updateCompleteTodo', { completed: checked, id })
    },
    removeTodo(id) {
      this.$store.dispatch('removeTodo', id)
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },
    doneEdit({ title, id }) {
      if (!this.editedTodo) {
        return
      }
      title = title.trim()
      if (title !== this.beforeEditCache)
        title
          ? this.$store
              .dispatch('updateTitleTodo', { title, id })
              .then(() => (this.editedTodo = null))
          : this.$store
              .dispatch('removeTodo', id)
              .then(() => (this.editedTodo = null))
      else this.editedTodo = null
    },
    cancelEdit(todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    visibility() {
      return this.$store.getters.visibility
    },
  },
  directives: {
    'todo-focus': function(el, binding) {
      if (binding.value) {
        el.focus()
      }
    },
  },
}
</script>

<style lang="scss">
.todo-list {
  flex-grow: 1;
  list-style: none;
  margin: 0;
  padding: 0;

  .todo {
    display: flex;
    border-bottom: 1px solid $primary-lightest;

    &__view {
      display: flex;
      flex-grow: 1;
      position: relative;
      padding: 5px;

      .checkbox {
        color: $primary-lightest;
        margin-right: 30px;

        .toggle {
          display: none;
        }

        .label {
          position: relative;
          transition: color 0.2s ease-out;
        }

        .label::before {
          content: '';
          height: 20px;
          width: 20px;
          border: 1px solid;
          border-radius: 50%;
        }

        .label::after {
          content: none;
          left: 3px;
          height: 8px;
          width: 20px;
          border-left: 2px solid;
          border-bottom: 2px solid;
          transform: rotate(-45deg);
        }

        .label::before,
        .label::after {
          top: 18px;
          position: absolute;
          display: inline-block;
        }

        .toggle:checked + .label::after {
          content: '';
        }
      }

      .title {
        word-break: break-all;
        flex-grow: 1;
        font-size: 24px;
        font-weight: 700;
        font-style: italic;
        transition: color 0.2s ease-out;
      }

      .destroy {
        display: none;
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: inherit;
        color: $primary-light;
        font-size: 30px;
        transition: color 0.2s ease-out;

        &::after {
          content: '×';
        }

        &:hover {
          color: $primary;
        }
      }

      &:hover {
        .destroy {
          display: inline-block;
        }
      }
    }
  }
  .editing {
    .edit {
      display: flex;
    }

    .todo__view {
      display: none;
    }
  }
}

.edit {
  display: none;
  flex-grow: 1;
  position: relative;

  &-title {
    height: auto;
    margin-left: 23px;
    padding: 3px 0 3px 10px;
    word-break: break-all;
    flex-grow: 1;
    font-size: 24px;
    font-weight: 700;
    font-style: italic;
    color: $primary;
    transition: color 0.2s ease-out;

    &:focus {
      border: 2px solid $primary;
      background-color: $primary-lightness;
    }
  }

  &-done {
    right: 35px;
  }
  &-cancel {
    right: 7px;
  }
  &-done,
  &-cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    width: 28px;
    height: 24px;
    top: 7px;
    position: absolute;
    background-color: inherit;

    &:hover,
    &:focus {
      background-color: inherit;
    }
  }
}
</style>
