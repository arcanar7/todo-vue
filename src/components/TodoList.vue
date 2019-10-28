<template>
  <div class="todo-wrapper">
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <button class="new-todo-btn" @click="addTodo" title="Add todo">+</button>
    <div class="empty-state" v-if="!todos.length">
      <p>
        Either you've done everything already or there are still things to add
        to your list. Add your first todo.
      </p>
      <img src="../assets/icons/arrow.svg" alt="" />
    </div>
    <section class="main" v-else>
      <ul class="todo-list">
        <li v-for="todo of todos" class="todo" :key="todo.id">
          <div class="view">
            <label>{{ todo }}</label>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        console.log(this.newTodo)
        this.todos.push(this.newTodo)
        this.newTodo = ''
      }
    },
  },
  computed: {},
}
</script>

<style lang="scss">
.todo-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}

.new-todo-btn {
  width: 44px;
  height: 44px;
  position: absolute;
  right: 0;
}
.new-todo {
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
</style>
