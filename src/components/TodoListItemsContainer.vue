<template>
  <todo-list-items-edit v-if="isEdit" :todo="todo" />
  <todo-list-items-item v-else :todo="todo" />
</template>

<script>
import { mapGetters } from 'vuex';
import TodoListItemsItem from '@/components/TodoListItemsItem.vue';
import TodoListItemsEdit from '@/components/TodoListItemsEdit.vue';

export default {
  name: 'TodoListItemsContainer',
  components: {
    TodoListItemsItem,
    TodoListItemsEdit,
  },
  props: { todo: { type: Object, required: true } },
  computed: {
    ...mapGetters('Todo', ['editedTodoId']),

    isEdit() {
      return this.todo.id === this.editedTodoId;
    },
  },
};
</script>
