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
    <div class="empty-state" v-if="!todos.length">
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
        <li v-for="todo of todos" class="todo" :key="todo.id">
          <div class="todo__view">
            <div class="checkbox">
              <input
                class="toggle"
                type="checkbox"
                v-model="todo.complited"
                :id="todo.id"
              />
              <label
                :for="todo.id"
                class="label"
                :class="{ 'color-primary': todo.complited }"
              ></label>
            </div>
            <label
              class="title"
              :class="
                todo.complited ? 'color-primary-lightest' : 'color-primary'
              "
              >{{ todo.title }} {{ todo.complited }}</label
            >
            <button class="destroy" @click="removeTodo(todo.id)"></button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
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
  },
  computed: {
    todos() {
      return this.$store.getters.todos
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
    border-bottom: 1px solid $primary-lightest;

    &__view {
      display: flex;
      position: relative;
      padding: 5px;

      .checkbox {
        color: $primary-lightest;
        margin-right: 30px;

        .toggle {
          display: none;
          // opacity: 1;
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
}
</style>
