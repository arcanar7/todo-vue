<template>
  <div class="todo-wrapper">
    <todo-new></todo-new>
    <p class="error-title" v-if="isError">{{ isError }}</p>
    <div class="empty-state" v-else-if="!todos.length && !loadingApp">
      <p>
        {{ $t('todo-list.empty') }}
      </p>
      <img src="@/assets/icons/arrow.svg" alt="" />
    </div>
    <section class="main" v-else>
      <spinner :primary="'primary'" v-if="loadingApp"></spinner>
      <todos v-else :todos="todos"></todos>
    </section>
    <footer class="footer" v-show="todos.length && !loadingApp">
      <todo-nav :todos="todos"></todo-nav>
    </footer>
  </div>
</template>

<script>
import Todos from './Todos/Todos'
import TodoNew from './TodoNew/TodoNew'
import TodoNav from './TodoNav/TodoNav'
import Spinner from '@/components/Spinner'

export default {
  components: {
    Todos,
    TodoNew,
    TodoNav,
    Spinner,
  },
  computed: {
    todos() {
      return this.$store.getters.todos
    },
    isError() {
      return this.$store.getters.error
    },
  },
  created() {
    this.$store.dispatch('fetchTodos').catch(() => {})
  },
}
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
  color: $primary;
  text-align: center;
}

.main {
  display: flex;
  margin: 10px 0;
}
</style>
