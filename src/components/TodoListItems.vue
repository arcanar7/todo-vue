<template>
  <ul class="todo-list">
    <transition-group name="todo" mode="out-in">
      <li v-for="todo of filteredTodos" class="todo" :class="{ editing: todo.id === editedTodoId }" :key="todo.id">
        <todo-list-items-item :todo="todo"></todo-list-items-item>
        <todo-list-items-edit :todo="todo"></todo-list-items-edit>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
import filters from '@/helpers/filter.helper';
import TodoListItemsItem from '@/components/TodoListItemsItem.vue';
import TodoListItemsEdit from '@/components/TodoListItemsEdit.vue';

export default {
  name: 'TodoListItems',
  components: {
    TodoListItemsItem,
    TodoListItemsEdit,
  },
  props: { todos: { type: Array, required: true } },
  computed: {
    ...mapState('Todo', ['visibility', 'editedTodo']),

    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    editedTodoId() {
      return this.editedTodo?.id;
    },
  },
};
</script>

<style lang="scss">
.todo-list {
  flex-grow: 1;
  padding: 0;
  margin: 0;
  list-style: none;

  .todo {
    display: flex;
    min-height: 38px;
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
  transition: 0.3s all;
}

.todo-enter,
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
