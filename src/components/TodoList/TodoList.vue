<template>
  <div class="todo-wrapper">
    <todo-new></todo-new>
    <div class="empty-state" v-if="!todos.length && !loadingApp">
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
  },
  created() {
    this.$store.dispatch('fetchTodos')
  },
}
</script>

<style lang="scss">
.todo-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.empty-state {
  display: flex;
  align-self: center;
  align-items: center;
  text-align: center;
  color: $primary;
  width: 300px;
}

.main {
  display: flex;
  margin: 10px 0;
}
</style>
