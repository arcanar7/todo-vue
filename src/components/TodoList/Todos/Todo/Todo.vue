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
      title="Remove todo"
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
</style>
