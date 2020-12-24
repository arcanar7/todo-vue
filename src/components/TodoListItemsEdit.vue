<template>
  <div class="edit">
    <span ref="fake" class="edit-title__fake">{{ todo.title }}</span>
    <textarea
      class="edit-title"
      type="text"
      :style="{ height: textHeight }"
      v-model="todo.title"
      v-todo-focus="todo === editedTodo"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keydown.enter.prevent=""
      @keyup.esc="cancelEdit"
    />
    <button class="edit-done" @mousedown="doneEdit" :title="$t('todo-edit.submit-edit')">
      <icon-base width="100%" height="100%" iconColor="hsl(167, 49%, 31%)">
        <icon-checkmark />
      </icon-base>
    </button>
    <button class="edit-cancel" @mousedown="cancelEdit" :title="$t('todo-edit.cancel-edit')">
      <icon-base width="100%" height="100%" iconColor="hsl(167, 49%, 31%)">
        <icon-cancel />
      </icon-base>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import IconBase from '@/components/IconBase.vue';
import IconCheckmark from '@/components/icons/IconCheckmark.vue';
import IconCancel from '@/components/icons/IconCancel.vue';

export default {
  name: 'TodoListItemsEdit',
  components: {
    IconBase,
    IconCheckmark,
    IconCancel,
  },
  directives: {
    'todo-focus': (el, binding) => {
      if (binding.value) {
        el.focus();
      }
    },
  },
  props: { todo: { type: Object, required: true } },
  data() {
    return {
      textHeight: '27px',
    };
  },
  updated() {
    this.textHeight = getComputedStyle(this.$refs.fake).height;
  },
  computed: {
    ...mapState('Todo', ['editedTodo', 'beforeEditTitle']),
  },
  methods: {
    ...mapMutations('Todo', ['editTodo']),
    ...mapActions('Todo', ['updateTodo', 'removeTodo']),
    ...mapMutations('Utils', ['setError', 'clearError']),

    async doneEdit() {
      if (!this.editedTodo) {
        return;
      }

      const { title, completed, id } = this.todo;
      const newTitle = title.trim();

      if (newTitle !== this.beforeEditTitle) {
        this.clearError();
        try {
          if (newTitle) {
            await this.updateTodo({ title: newTitle, completed, id });
          } else {
            await this.removeTodo(id);
          }
        } catch (error) {
          this.setError(error.message);
        }
      }

      this.editTodo(null);
    },
    cancelEdit() {
      this.todo.title = this.beforeEditTitle;
      this.editTodo(null);
    },
  },
};
</script>

<style lang="scss">
.edit {
  position: relative;
  display: none;
  width: 100%;

  &-title,
  &-title__fake {
    margin-left: 23px;
    font-size: 24px;
    font-style: italic;
    font-weight: 700;
    word-break: break-all;
  }

  &-title {
    width: 100%;
    padding: 3px 70px 3px 10px;
    overflow: hidden;
    color: $text-primary;
    resize: none;
    background-color: $primary-lightness;
    border: 2px solid $primary;
    outline: none;
    transition: 0.2s color ease-out;
  }

  &-title__fake {
    position: absolute;
    width: 485px;
    padding: 3px 0 3px 10px;
    visibility: hidden;
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
    top: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 25px;
    padding: 0;
    background-color: inherit;

    img {
      width: 100%;
      height: 100%;
    }

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

@media screen and (max-width: $screen) {
  .edit {
    &-title {
      padding-right: 100px;
      font-size: 32px;
    }

    &-title__fake {
      width: calc(100% - 137px);
      font-size: 32px;
    }

    &-done {
      right: 47px;
    }

    &-done,
    &-cancel {
      width: 40px;
      height: 34px;
    }
  }
}
</style>
