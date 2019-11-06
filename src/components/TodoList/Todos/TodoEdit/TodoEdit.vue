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
  display: none;
  flex-grow: 1;
  position: relative;

  &-title {
    height: auto;
    margin-left: 23px;
    padding: 3px 0 3px 10px;
    word-break: break-all;
    flex-grow: 1;
    font-size: 24px;
    font-weight: 700;
    font-style: italic;
    color: $primary;
    transition: color 0.2s ease-out;
    border: 2px solid $primary;
    background-color: $primary-lightness;
  }

  &-done {
    right: 35px;
  }
  &-cancel {
    right: 7px;
  }
  &-done,
  &-cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    width: 28px;
    height: 24px;
    top: 7px;
    position: absolute;
    background-color: inherit;

    &:hover,
    &:focus {
      background-color: inherit;
    }
  }
}
</style>
