<template>
  <div class="app-wrapper">
    <header class="header-app">
      <div class="logout">
        {{ email }}
        <button class="exit" title="Log out" @click="onLogOut">
          <img src="../assets/icons/exit.svg" alt="" />
        </button>
      </div>
      <language />
      <h1 class="title">{{ $t('title') }}</h1>
    </header>
    <main class="app-inner">
      <todo-list />
    </main>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList/TodoList.vue'
import Language from '@/components/Language.vue'

export default {
  name: 'home',
  components: {
    TodoList,
    Language,
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

.header-app {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-top: 20px;

  .logout {
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    color: $primary;

    .exit {
      margin-left: 5px;
      color: $primary;
      background-color: inherit;
    }
  }

  .title {
    font-weight: 900;
    color: $primary;
    text-align: center;
  }
}

.app-inner {
  display: flex;
  width: 588px;
  padding: 5px;
  background-color: $background;
  border: 1px solid $primary;
  border-radius: 10px;
  box-shadow: 0 0 10px hsla(0, 0, 0, 0.5);
}

@media screen and (max-width: $screen) {
  .header-app {
    width: 90%;
  }

  .app-inner {
    width: 90%;
  }
}
</style>
