<template>
  <div class="new-todo">
    <input
      class="new-todo__title"
      autofocus
      autocomplete="off"
      ref="newTodo"
      :placeholder="$t('todo-new.ph-new')"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <button
      class="new-todo__btn"
      @click="addTodo"
      :title="$t('todo-new.add-title')"
      :disabled="localLoading"
    >
      <app-spinner v-if="localLoading"></app-spinner>
      <span v-else>+</span>
    </button>
  </div>
</template>

<script>
import AppSpinner from '@/components/AppSpinner'

export default {
  name: 'TodoListNew',
  components: { AppSpinner },
  data() {
    return {
      newTodo: '',
    }
  },
  computed: {
    localLoading() {
      return this.$store.getters.localLoading
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        this.$store
          .dispatch('createTodo', { title: this.newTodo })
          .catch(() => {})
        this.newTodo = ''
      }
      this.$refs.newTodo.focus()
    },
  },
}
</script>

<style lang="scss">
.new-todo {
  position: relative;
  display: flex;

  &__title {
    flex-grow: 1;

    &:focus {
      height: 38px;
      background-color: $primary-lightness;
      border: 2px solid $primary;
    }
  }

  &__btn {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;

    span {
      font-size: 32px;
    }
  }
}
</style>
