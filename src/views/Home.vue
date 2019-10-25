<template>
  <main class="wrapper">
    <h1 class="title">My ToDo List</h1>
    <section class="inner">
      <div class="account">
        <span class="dropdown">
          arcanar7@gmail.com
          <ul class="menu">
            <li class="menu__logout">Log out</li>
          </ul>
        </span>
      </div>
      <TodoList />
    </section>
  </main>
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'home',
  components: {
    TodoList,
  },
}
</script>

<style lang="scss">
.title {
  color: $primary;
}

.account {
  display: flex;
  justify-content: flex-end;
  background-color: yellow;
  width: 100%;
  border-radius: 10px;
}

.dropdown {
  cursor: pointer;
  background-color: blue;
  color: white;
  position: relative;
  display: inline-block;
  padding: 5px;
  border-radius: 10px;

  .menu {
    list-style: none;
    background-color: green;
    display: none;

    &__logout {
      cursor: pointer;
      display: block;
    }
  }

  &:hover {
    .menu {
      display: block;
    }
  }
}
</style>
