<template>
  <ul class="todo-list">
    <transition-group name="todo" mode="out-in">
      <li
        v-for="todo of filteredTodos"
        class="todo"
        :class="{ editing: todo == editedTodo }"
        :key="todo.id"
      >
        <todo-list-items-item :todo="todo"></todo-list-items-item>
        <todo-list-items-edit :todo="todo"></todo-list-items-edit>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import TodoListItemsItem from './TodoListItemsItem'
import TodoListItemsEdit from './TodoListItemsEdit'

import { filters } from '@/mixins/filter.mixin'

export default {
  name: 'TodoListItems',
  components: {
    TodoListItemsItem,
    TodoListItemsEdit,
  },
  mixins: [filters],
  props: { todos: { type: Array, required: true } },
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
  padding: 0;
  margin: 0;
  list-style: none;

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

.todo-enter-active,
.todo-leave-active {
  transition: all 0.3s;
}

.todo-enter,
.todo-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-move {
  transition: all 0.3s;
}
</style>
