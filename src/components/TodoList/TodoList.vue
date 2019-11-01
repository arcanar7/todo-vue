<template>
  <div class="todo-wrapper">
    <todo-new></todo-new>
    <div class="empty-state" v-if="!todos.length && !loadingApp">
      <p>
        Either you've done everything already or there are still things to add
        to your list. Add your first todo.
      </p>
      <img src="@/assets/icons/arrow.svg" alt="" />
    </div>
    <section class="main" v-else>
      <div class="lds-ring primary" v-if="loadingApp">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <todos v-else :visibility="visibility" :todos="todos"></todos>
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
import Todos from './Todos/Todos'
import TodoNew from './TodoNew/TodoNew'

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
  components: {
    Todos,
    TodoNew,
  },
  data() {
    return {
      newTodo: '',
      visibility: 'all',
    }
  },
  methods: {
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
    remaining() {
      return filters.active(this.todos).length
    },
  },
  filters: {
    pluralize(n) {
      return n === 1 ? 'item' : 'items'
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
