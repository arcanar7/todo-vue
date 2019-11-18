<template>
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
    <button
      class="edit-done"
      @mousedown="doneEdit(todo)"
      :title="$t('todo-edit.edit-title')"
    >
      <img src="@/assets/icons/edit.svg" alt="" />
    </button>
    <button
      class="edit-cancel"
      @mousedown="cancelEdit(todo)"
      :title="$t('todo-edit.cancel-edit-title')"
    >
      <img src="@/assets/icons/cancel.svg" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoListItemsEdit',
  directives: {
    'todo-focus': function(el, binding) {
      if (binding.value) {
        el.focus()
      }
    },
  },
  props: { todo: { type: Object, required: true } },
  computed: {
    editedTodo() {
      return this.$store.getters.editedTodo
    },
    beforeEditTitle() {
      return this.$store.getters.beforeEditTitle
    },
  },
  methods: {
    doneEdit({ title, completed, id }) {
      if (!this.editedTodo) {
        return
      }
      title = title.trim()
      if (title !== this.beforeEditTitle)
        title
          ? this.$store
              .dispatch('updateTodo', { title, completed, id })
              .then(() => this.$store.dispatch('editTodo', null))
              .catch(() => {})
          : this.$store
              .dispatch('removeTodo', id)
              .then(() => this.$store.dispatch('editTodo', null))
              .catch(() => {})
      else this.$store.dispatch('editTodo', null)
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditTitle
      this.$store.dispatch('editTodo', null)
    },
  },
}
</script>

<style lang="scss">
.edit {
  position: relative;
  display: none;
  width: 100%;

  &-title {
    width: 100%;
    height: auto;
    padding: 3px 0 3px 10px;
    margin-left: 23px;
    overflow: hidden;
    font-size: 24px;
    font-style: italic;
    font-weight: 700;
    color: $primary;
    word-break: break-all;
    background-color: $primary-lightness;
    border: 2px solid $primary;
    transition: color 0.2s ease-out;
  }

  &-done {
    right: 35px;
  }

  &-cancel {
    right: 7px;
  }

  &-done,
  &-cancel {
    position: absolute;
    top: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 24px;
    padding: 0;
    background-color: inherit;

    &:focus {
      background-color: inherit;
    }
  }
}

@media (hover: hover) {
  .edit-done:hover,
  .edit-cancel:hover {
    background-color: inherit;
  }
}
</style>
