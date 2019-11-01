<template>
  <div class="app-wrapper">
    <header class="header">
      <div class="logout">
        {{ email }}
        <button class="exit" title="Log out" @click="onLogOut">
          <img src="../assets/icons/exit.svg" alt="" />
        </button>
      </div>
      <h1 class="title">My ToDo List</h1>
    </header>
    <main class="app-inner">
      <TodoList />
    </main>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList/TodoList.vue'

export default {
  name: 'home',
  components: {
    TodoList,
  },
  methods: {
    onLogOut() {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    },
  },
  computed: {
    email() {
      return this.$store.getters.email
    },
  },
}
</script>

<style lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 600px;

  .logout {
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    color: $primary;

    .exit {
      margin-left: 5px;
      background-color: inherit;
      color: $primary;
    }
  }

  .title {
    color: $primary;
    text-align: center;
    font-weight: 900;
  }
}

.app-inner {
  display: flex;
  width: 588px;
  border: 1px solid $primary;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 10px hsla(0, 0, 0, 0.5);
  background-color: $background;
}
</style>
