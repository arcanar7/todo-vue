<template>
  <ul class="todo-list">
    <transition-group name="todo" mode="out-in">
      <li v-for="todo of filteredTodos" class="todo" :class="{ editing: todo.id === editedTodoId }" :key="todo.id">
        <todo-list-items-container :todo="todo" />
      </li>
    </transition-group>
  </ul>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import filters from '../helpers/filter.helper';
import TodoListItemsContainer from './TodoListItemsContainer.vue';

export default {
  name: 'TodoListItems',
  components: {
    TodoListItemsContainer,
  },
  computed: {
    ...mapState('Todo', ['todos', 'visibility', 'editedTodo']),
    ...mapGetters('Todo', ['editedTodoId']),

    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
  },
};
</script>

<style lang="scss">
.todo-list {
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  list-style: none;

  .todo {
    display: flex;
    min-height: 38px;
    border-bottom: 1px solid $primary-lightest;
  }
}

.todo-enter-active,
.todo-leave-active {
  transition: 0.3s all;
}

.todo-enter-from,
.todo-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-move {
  transition: 0.3s all;
}

@media screen and (max-width: $screen) {
  .todo {
    align-items: center;
    min-height: 60px;
  }
}
</style>
