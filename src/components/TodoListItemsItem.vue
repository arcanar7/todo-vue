<template>
  <div class="todo__view" :class="{ todo__view_updated: isUpdate }">
    <div class="checkbox">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.completed"
        :id="todo.id"
        @change="onToggleComplete"
        :disabled="!isOnLine"
      />
      <label :for="todo.id" class="label" :class="{ 'color-primary': todo.completed }"></label>
    </div>
    <label class="title" :class="todo.completed ? 'completed' : 'color-primary'" @click="onClickTitle">
      {{ todo.title }}
    </label>
    <button class="removeButton" @click="onRemoveTodo" :title="$t('todo.remove-title')" :disabled="!isOnLine">
      &times;
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'TodoListItemsItem',
  props: { todo: { type: Object, required: true } },
  data() {
    return {
      clickCount: 0,
      clickTimer: null,
      isUpdate: false,
    };
  },
  methods: {
    ...mapMutations('Todo', ['editTodo']),
    ...mapActions('Todo', ['updateTodo', 'removeTodo']),
    ...mapMutations('Utils', ['setError', 'clearError']),

    onClickTitle() {
      if (this.isOnLine) {
        this.clickCount += 1;
        if (this.clickCount === 1) {
          this.clickTimer = setTimeout(() => {
            this.clickCount = 0;
            this.onToggleComplete();
          }, 250);
        } else if (this.clickCount === 2) {
          clearTimeout(this.clickTimer);
          this.clickCount = 0;
          this.editTodo(this.todo);
        }
      }
    },
    async onToggleComplete() {
      this.clearError();
      this.isUpdate = true;
      try {
        await this.updateTodo({
          title: this.todo.title,
          completed: !this.todo.completed,
          id: this.todo.id,
        });
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isUpdate = false;
      }
    },
    async onRemoveTodo() {
      this.clearError();
      try {
        await this.removeTodo(this.todo.id);
      } catch (error) {
        this.setError(error.message);
      }
    },
  },
};
</script>

<style lang="scss">
.todo__view {
  position: relative;
  display: flex;
  flex-grow: 1;
  min-height: 27px;
  padding: 5px;
  line-height: 1;
  transition: background-color 0.3s;

  .checkbox {
    position: relative;
    margin-right: 30px;
    color: $text-primary;

    .toggle {
      display: none;
    }

    .label {
      position: absolute;
      top: 2px;
      transition: color 0.2s ease-out;

      &::before {
        width: 20px;
        height: 20px;
        content: '';
        border: 1px solid;
        border-radius: 50%;
      }

      &::after {
        left: 3px;
        width: 20px;
        height: 8px;
        content: none;
        border-bottom: 2px solid;
        border-left: 2px solid;
        transform: rotate(-45deg);
      }

      &::before,
      &::after {
        position: absolute;
        display: inline-block;
      }
    }

    .toggle:checked + .label::after {
      content: '';
    }
  }

  .title {
    width: 100%;
    padding-right: 30px;
    font-size: 24px;
    font-style: italic;
    font-weight: 700;
    word-break: break-all;
    transition: 0.5s color ease-out;
  }
}

.removeButton {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: none;
  font-size: 30px;
  line-height: 1;
  color: $primary-light;
  background: none;
  transition: 0.3s color ease-out;
}

.todo__view_updated {
  background-color: $todo-highlight-color;

  .title {
    color: $primary-lightness;
  }

  .removeButton {
    background-color: $todo-highlight-color;
  }
}

.completed {
  color: $primary-lightest;
  text-decoration: line-through;
}

.color-primary {
  color: $text-primary;
}

@media (hover: hover) {
  .removeButton:hover {
    color: $text-primary;
    background-color: inherit;
  }

  .todo__view:hover {
    .removeButton {
      display: inline-block;
    }
  }
}

@media (pointer: coarse) {
  .todo__view {
    .removeButton {
      display: inline-block;
      font-size: 40px;
    }
  }
}

@media screen and (max-width: $screen) {
  .todo__view {
    min-height: 36px;

    .title {
      font-size: 32px;
    }

    .removeButton {
      font-size: 40px;

      &:active {
        color: $primary-lightest;
      }
    }

    .checkbox {
      .label {
        top: 7px;
      }
    }
  }
}
</style>
