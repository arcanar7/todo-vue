<template>
  <div class="todo-wrapper">
    <todo-list-new />
    <div class="empty-state" v-if="!todosArray.length && !loadingApp">
      <p>
        {{ $t('todo-list.empty') }}
      </p>
      <icon-base icon-name="arrow" width="120px" height="120px" viewBox="0 0 256 512">
        <icon-arrow />
      </icon-base>
    </div>
    <section class="main" v-else>
      <app-spinner :primary="'primary'" v-if="loadingApp"></app-spinner>
      <todo-list-items v-else :todos="todosArray"></todo-list-items>
    </section>
    <section class="nav-wrapper" v-show="todosArray.length && !loadingApp">
      <todo-list-nav :todos="todosArray"></todo-list-nav>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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
  async created() {
    this.clearError();
    if (this.isOnLine) {
      this.setLoading(true);
      try {
        await this.fetchTodos();
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.setLoading(false);
      }
    }
  },
  computed: {
    ...mapState('Todo', ['todos']),

    todosArray() {
      return [...this.todos.map((item) => ({ ...item }))];
    },
  },
  methods: {
    ...mapActions('Todo', ['fetchTodos']),
    ...mapMutations('Utils', ['setLoading', 'setError', 'clearError']),
  },
};
</script>

<style lang="scss">
.todo-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;

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
