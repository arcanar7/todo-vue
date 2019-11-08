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
  props: { todo: Object },
  methods: {
    doneEdit({ title, id }) {
      if (!this.editedTodo) {
        return
      }
      title = title.trim()
      if (title !== this.beforeEditTitle)
        title
          ? this.$store
              .dispatch('updateTitleTodo', { title, id })
              .then(() => this.$store.dispatch('editTodo', null))
          : this.$store
              .dispatch('removeTodo', id)
              .then(() => this.$store.dispatch('editTodo', null))
      else this.$store.dispatch('editTodo', null)
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditTitle
      this.$store.dispatch('editTodo', null)
    },
  },
  computed: {
    editedTodo() {
      return this.$store.getters.editedTodo
    },
    beforeEditTitle() {
      return this.$store.getters.beforeEditTitle
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

<style lang="scss">
.edit {
  position: relative;
  display: none;
  flex-grow: 1;

  &-title {
    flex-grow: 1;
    height: auto;
    padding: 3px 0 3px 10px;
    margin-left: 23px;
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
    padding: 2px;
    background-color: inherit;

    &:hover,
    &:focus {
      background-color: inherit;
    }
  }
}
</style>
