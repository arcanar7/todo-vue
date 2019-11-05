<template>
  <ul class="todo-list">
    <li
      v-for="todo of filteredTodos"
      class="todo"
      :class="{ editing: todo == editedTodo }"
      :key="todo.id"
    >
      <todo :todo="todo"></todo>
      <todo-edit :todo="todo"></todo-edit>
    </li>
  </ul>
</template>

<script>
import Todo from './Todo/Todo'
import TodoEdit from './TodoEdit/TodoEdit'
import { filters } from '@/mixins/filter.mixin'

export default {
  mixins: [filters],
  components: {
    Todo,
    TodoEdit,
  },
  props: { todos: Array },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    visibility() {
      return this.$store.getters.visibility
    },
    editedTodo() {
      return this.$store.getters.editedTodo
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
</style>
