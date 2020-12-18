<template>
  <div class="todo-wrapper">
    <todo-list-new />
    <div class="empty-state" v-if="!todos.length && !loadingApp">
      <p>
        {{ $t('todo-list.empty') }}
      </p>
      <icon-base icon-name="arrow" width="120px" height="120px" viewBox="0 0 256 512">
        <icon-arrow />
      </icon-base>
    </div>
    <section class="main" v-else>
      <app-spinner :primary="'primary'" v-if="loadingApp"></app-spinner>
      <todo-list-items v-else :todos="todos"></todo-list-items>
    </section>
    <section class="nav-wrapper" v-show="todos.length && !loadingApp">
      <todo-list-nav :todos="todos"></todo-list-nav>
    </section>
  </div>
</template>

<script>
import TodoListItems from '@/components/TodoListItems.vue';
import TodoListNew from '@/components/TodoListNew.vue';
import TodoListNav from '@/components/TodoListNav.vue';
import AppSpinner from '@/components/AppSpinner.vue';
import IconBase from '@/components/IconBase.vue';
import IconArrow from '@/components/icons/IconArrow.vue';

export default {
  name: 'TodoList',
  components: {
    TodoListItems,
    TodoListNew,
    TodoListNav,
    AppSpinner,
    IconBase,
    IconArrow,
  },
  computed: {
    todos() {
      return [...this.$store.getters.todos.map((item) => ({ ...item }))];
    },
    isError() {
      return this.$store.getters.error;
    },
  },
  created() {
    this.$store.dispatch('fetchTodos').catch(() => {});
  },
};
</script>

<style lang="scss">
.todo-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .error-title {
    margin: 10px auto;
  }
}

.empty-state {
  display: flex;
  align-items: center;
  align-self: center;
  width: 300px;
  color: $text-primary;
  text-align: center;
}

.main {
  display: flex;
  margin: 10px 0;
}
</style>
