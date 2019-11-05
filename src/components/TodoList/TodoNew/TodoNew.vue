<template>
  <div class="new-todo">
    <input
      class="new-todo__title"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <button
      class="new-todo__btn"
      @click="addTodo"
      title="Add todo"
      :disabled="localLoading"
    >
      <spinner v-if="localLoading"></spinner>
      <span v-else>+</span>
    </button>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'

export default {
  components: { Spinner },
  data() {
    return {
      newTodo: '',
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        this.$store
          .dispatch('createTodo', { title: this.newTodo })
          .catch(() => {})
        this.newTodo = ''
      }
    },
  },
  computed: {
    localLoading() {
      return this.$store.getters.localLoading
    },
  },
}
</script>

<style lang="scss">
.new-todo {
  display: flex;
  position: relative;

  &__title {
    flex-grow: 1;

    &:focus {
      border: 2px solid $primary;
      height: 38px;
      background-color: $primary-lightness;
    }
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    position: absolute;
    right: 0;

    span {
      font-size: 32px;
    }
  }
}
</style>
