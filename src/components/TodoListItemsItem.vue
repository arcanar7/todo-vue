<template>
  <div class="todo__view">
    <div class="checkbox">
      <input
        ref="checkBoxToggle"
        class="toggle"
        type="checkbox"
        v-model="todo.completed"
        :id="todo.id"
        @change="onToggleComplete"
        :disabled="!isOnline"
      />
      <label :for="todo.id" class="label" :class="{ 'color-primary': todo.completed }"></label>
    </div>
    <label class="title" :class="todo.completed ? 'completed' : 'color-primary'" @click="onClickTitle($event, todo)">{{
      todo.title
    }}</label>
    <button
      class="destroy"
      @click="removeTodo(todo.id)"
      :title="$t('todo.remove-title')"
      :disabled="!isOnline"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'TodoListItemsItem',
  props: { todo: { type: Object, required: true } },
  data() {
    return {
      clickCount: 0,
      clickTimer: null,
    };
  },
  methods: {
    onClickTitle(e, todo) {
      if (this.isOnline) {
        this.clickCount += 1;
        if (this.clickCount === 1) {
          this.clickTimer = setTimeout(() => {
            this.clickCount = 0;
            this.onToggleComplete(e);
          }, 250);
        } else if (this.clickCount === 2) {
          clearTimeout(this.clickTimer);
          this.clickCount = 0;
          this.editTodo(todo);
        }
      }
    },
    onToggleComplete(e) {
      let { checked } = this.$refs.checkBoxToggle;
      const { id } = this.$refs.checkBoxToggle;
      if (e.target.tagName === 'LABEL') {
        checked = !checked;
      }
      this.$store
        .dispatch('updateTodo', {
          title: this.todo.title,
          completed: checked,
          id,
        })
        .catch(() => {});
    },
    editTodo(todo) {
      this.$store.dispatch('beforeEditTitle', todo.title);
      this.$store.dispatch('editTodo', todo);
    },
    removeTodo(id) {
      this.$store.dispatch('removeTodo', id).catch(() => {});
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
    transition: 0.5s color ease-out;
  }

  .destroy {
    position: absolute;
    right: 0;
    bottom: 0;
    display: none;
    font-size: 30px;
    color: $primary-light;
    background-color: inherit;
    transition: 0.2s color ease-out;

    &::after {
      content: '×';
    }
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
  .destroy:hover {
    color: $text-primary;
  }

  .todo__view:hover {
    .destroy {
      display: inline-block;
    }
  }
}

@media (pointer: coarse) {
  .todo__view {
    .destroy {
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

    .destroy {
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
