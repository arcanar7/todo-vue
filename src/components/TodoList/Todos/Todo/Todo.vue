<template>
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
      :title="$t('todo.remove-title')"
    ></button>
  </div>
</template>

<script>
export default {
  props: { todo: Object },
  methods: {
    onToggleComplete(e) {
      const { checked, id } = e.target
      this.$store.dispatch('updateCompleteTodo', { completed: checked, id })
    },
    editTodo(todo) {
      this.$store.dispatch('beforeEditTitle', todo.title)
      this.$store.dispatch('editTodo', todo)
    },
    removeTodo(id) {
      this.$store.dispatch('removeTodo', id)
    },
  },
}
</script>

<style lang="scss">
.todo__view {
  position: relative;
  display: flex;
  flex-grow: 1;
  padding: 5px;

  .checkbox {
    position: relative;
    margin-right: 30px;
    color: $primary-lightest;

    .toggle {
      display: none;
    }

    .label {
      position: absolute;
      top: 5px;
      transition: color 0.2s ease-out;

      &::before {
        width: 20px;
        height: 20px;
        content: '';
        border: 1px solid;
        border-radius: 50%;
      }

      &::after {
        left: 3px;
        width: 20px;
        height: 8px;
        content: none;
        border-bottom: 2px solid;
        border-left: 2px solid;
        transform: rotate(-45deg);
      }

      &::before,
      &::after {
        position: absolute;
        display: inline-block;
      }
    }

    .toggle:checked + .label::after {
      content: '';
    }
  }

  .title {
    flex-grow: 1;
    font-size: 24px;
    font-style: italic;
    font-weight: 700;
    word-break: break-all;
    transition: color 0.5s ease-out;
  }

  .destroy {
    position: absolute;
    right: 0;
    bottom: 0;
    display: none;
    font-size: 30px;
    color: $primary-light;
    background-color: inherit;
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

.completed {
  color: $primary-lightest;
  text-decoration: line-through;
}

.color-primary {
  color: $primary;
}
</style>
