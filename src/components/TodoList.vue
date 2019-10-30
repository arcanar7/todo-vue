<template>
  <div class="todo-wrapper">
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <button
      class="new-todo-btn"
      @click="addTodo"
      title="Add todo"
      :disabled="localLoading"
    >
      <div class="lds-ring" v-if="localLoading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span v-else>+</span>
    </button>
    <div class="empty-state" v-if="!todos.length && !loadingApp">
      <p>
        Either you've done everything already or there are still things to add
        to your list. Add your first todo.
      </p>
      <img src="../assets/icons/arrow.svg" alt="" />
    </div>
    <section class="main" v-else>
      <div class="lds-ring primary" v-if="loadingApp">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul class="todo-list" v-else>
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
              <img src="../assets/icons/edit.svg" alt="" />
            </button>
            <button
              class="edit-cancel"
              @click="cancelEdit(todo)"
              title="Cancel edit"
            >
              <img src="../assets/icons/cancel.svg" alt="" />
            </button>
          </div>
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length" v-if="!loadingApp">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
      </span>
      <ul class="filters">
        <li>
          <button
            class="filters__btn"
            :class="{ selected: visibility == 'all' }"
            @click="onFiltered('all')"
          >
            All
          </button>
        </li>
        <li>
          <button
            class="filters__btn"
            :class="{ selected: visibility == 'active' }"
            @click="onFiltered('active')"
          >
            Active
          </button>
        </li>
        <li>
          <button
            class="filters__btn"
            :class="{ selected: visibility == 'completed' }"
            @click="onFiltered('completed')"
          >
            Completed
          </button>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >
        Clear completed
      </button>
    </footer>
  </div>
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
  data() {
    return {
      newTodo: '',
      visibility: 'all',
      editedTodo: null,
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        this.$store
          .dispatch('createTodo', { title: this.newTodo })
          .catch(() => {})
        this.newTodo = ''
      }
    },
    removeTodo(id) {
      this.$store.dispatch('removeTodo', id)
    },
    removeCompleted() {
      filters.completed(this.todos).map(item => {
        this.$store.dispatch('removeTodo', item.id)
      })
    },
    onFiltered(visibility) {
      this.visibility = visibility
    },
    onToggleComplete(e) {
      const { checked, id } = e.target
      this.$store.dispatch('updateCompleteTodo', { completed: checked, id })
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
    todos() {
      return this.$store.getters.todos
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length
    },
  },
  filters: {
    pluralize(n) {
      return n === 1 ? 'item' : 'items'
    },
  },
  directives: {
    'todo-focus': function(el, binding) {
      if (binding.value) {
        el.focus()
      }
    },
  },
  created() {
    this.$store.dispatch('fetchTodos')
  },
}
</script>

<style lang="scss">
.todo-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}

.new-todo-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  position: absolute;
  right: 0;
}
.new-todo {
  flex-grow: 1;

  &:focus {
    border: 2px solid $primary;
    height: 38px;
    background-color: $primary-lightness;
  }
}

.empty-state {
  display: flex;
  align-self: center;
  align-items: center;
  text-align: center;
  color: $primary;
  width: 300px;
}

.main {
  display: flex;
  margin: 10px 0;
}

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

.footer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  position: relative;
  padding-left: 10px;
}

.todo-count {
  padding: 5px;
  color: $primary;
}

.filters {
  display: flex;
  position: absolute;
  left: 35%;
  list-style: none;
  margin: 0;
  padding: 0;

  li + li {
    margin-left: 5px;
  }

  &__btn {
    background-color: inherit;
    color: $primary;
    padding: 5px;
  }

  &__btn:hover,
  &__btn:focus,
  .selected {
    background-color: $primary-light;
    color: $primary-lightness;
  }
}

.completed {
  color: $primary-lightest;
  text-decoration: line-through;
}

.clear-completed {
  background-color: inherit;
  color: $primary;
  padding: 5px;

  &:hover,
  &:focus {
    background-color: $primary-light;
    color: $primary-lightness;
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
