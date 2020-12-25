<template>
  <div class="new-todo">
    <input
      class="new-todo__title"
      autofocus
      autocomplete="off"
      v-todo-focus
      :placeholder="$t('todo-new.ph-new')"
      v-model="newTodo"
      @keyup.enter="addTodo"
      :disabled="!isOnLine || isLoading"
    />
    <button class="new-todo__btn" @click="addTodo" :title="$t('todo-new.add-title')" :disabled="isLoading || !isOnLine">
      <app-spinner v-if="isLoading" />
      <span v-else>+</span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';

export default {
  name: 'TodoListNew',
  components: { AppSpinner },
  directives: {
    'todo-focus': (el) => {
      el.focus();
    },
  },
  data() {
    return {
      newTodo: '',
      isLoading: false,
    };
  },
  methods: {
    ...mapActions('Todo', ['createTodo']),
    ...mapMutations('Utils', ['setError', 'clearError']),

    async addTodo() {
      if (this.newTodo) {
        this.clearError();
        this.isLoading = true;
        try {
          await this.createTodo({ title: this.newTodo });
        } catch (error) {
          this.setError(error.message);
        } finally {
          this.isLoading = false;
        }
        this.newTodo = '';
      }
    },
  },
};
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
    z-index: 2;
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
