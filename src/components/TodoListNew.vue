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
      :disabled="!isOnLine"
    />
    <button
      class="new-todo__btn"
      @click="addTodo"
      :title="$t('todo-new.add-title')"
      :disabled="localLoading || !isOnLine"
    >
      <app-spinner v-if="localLoading"></app-spinner>
      <span v-else>+</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';

export default {
  name: 'TodoListNew',
  components: { AppSpinner },
  data() {
    return {
      newTodo: '',
    };
  },
  computed: {
    ...mapState('Utils', ['localLoading']),
  },
  methods: {
    ...mapActions('Todo', ['createTodo']),
    ...mapMutations('Utils', ['setLocalLoading', 'setError', 'clearError']),

    async addTodo() {
      if (this.newTodo) {
        this.clearError();
        this.setLocalLoading(true);
        try {
          await this.createTodo({ title: this.newTodo });
        } catch (error) {
          this.setError(error.message);
        } finally {
          this.setLocalLoading(false);
        }
        this.newTodo = '';
      }
      this.$refs.newTodo.focus();
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
