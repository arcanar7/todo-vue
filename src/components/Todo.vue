<template>
  <ul class="todo-list">
    <li
      v-for="todo of filteredTodos"
      class="todo"
      :class="{ editing: todo == editedTodo }"
      :key="todo.id"
    >
      <div class="todo__view">
        <div class="checkbox">
          <input
            class="toggle"
            type="checkbox"
            v-model="todo.completed"
            :id="todo.id"
            @change="onToggleComplete"
          />
          <label
            :for="todo.id"
            class="label"
            :class="{ 'color-primary': todo.completed }"
          ></label>
        </div>
        <label
          class="title"
          :class="todo.completed ? 'completed' : 'color-primary'"
          @dblclick="editTodo(todo)"
          >{{ todo.title }}</label
        >
        <button
          class="destroy"
          @click="removeTodo(todo.id)"
          title="Remove todo"
        ></button>
      </div>
      <div class="edit">
        <input
          class="edit-title"
          type="text"
          v-model="todo.title"
          v-todo-focus="todo == editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)"
        />
        <button class="edit-done" @click="doneEdit(todo)" title="Edit todo">
          <img src="../assets/icons/edit.svg" alt="" />
        </button>
        <button
          class="edit-cancel"
          @click="cancelEdit(todo)"
          title="Cancel edit"
        >
          <img src="../assets/icons/cancel.svg" alt="" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
const filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed)
  },
}
export default {
  props: { visibility: String, todos: Array },
  data() {
    return {
      editedTodo: null,
    }
  },
  methods: {
    onToggleComplete(e) {
      const { checked, id } = e.target
      this.$store.dispatch('updateCompleteTodo', { completed: checked, id })
    },
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
  },
  directives: {
    'todo-focus': function(el, binding) {
      if (binding.value) {
        el.focus()
      }
    },
  },
}
</script>

<style></style>
