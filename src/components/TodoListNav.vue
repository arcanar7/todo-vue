<template>
  <nav class="todo-nav">
    <span class="todo-nav__count">
      <strong>{{ remaining }}</strong> {{ $tc('todo-nav.item', remaining) }}
      {{ $t('todo-nav.left') }}
    </span>
    <ul class="todo-nav-filters">
      <li>
        <button
          class="todo-nav-filters__btn"
          :class="{ selected: visibility == 'all' }"
          @click="onChangeVisibility('all')"
        >
          {{ $t('todo-nav.all') }}
        </button>
      </li>
      <li>
        <button
          class="todo-nav-filters__btn"
          :class="{ selected: visibility == 'active' }"
          @click="onChangeVisibility('active')"
        >
          {{ $t('todo-nav.active') }}
        </button>
      </li>
      <li>
        <button
          class="todo-nav-filters__btn"
          :class="{ selected: visibility == 'completed' }"
          @click="onChangeVisibility('completed')"
        >
          {{ $t('todo-nav.completed') }}
        </button>
      </li>
    </ul>
    <button
      class="todo-nav__clear-completed"
      @click="removeCompleted"
      v-show="todos.length > remaining"
      :disabled="!isOnLine || isLoading"
    >
      <app-spinner v-if="isLoading" />
      <span v-else>{{ $t('todo-nav.clear') }}</span>
    </button>
  </nav>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';
import filters from '@/helpers/filter.helper';

export default {
  name: 'TodoListNav',
  props: { todos: { type: Array, required: true } },
  components: { AppSpinner },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState('Todo', ['visibility']),

    remaining() {
      return filters.active(this.todos).length;
    },
  },
  methods: {
    ...mapMutations('Todo', ['setVisibility']),
    ...mapActions('Todo', ['removeTodo', 'deleteCompleted']),
    ...mapMutations('Utils', ['setError', 'clearError']),

    async removeCompleted() {
      this.clearError();
      this.isLoading = true;
      try {
        await this.deleteCompleted();
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    onChangeVisibility(visibility) {
      this.setVisibility(visibility);
    },
  },
};
</script>

<style lang="scss">
.todo-nav {
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 10px 10px 10px;

  &__count {
    padding: 5px;
    color: $text-primary;
  }

  &-filters {
    position: absolute;
    left: 35%;
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;

    li + li {
      margin-left: 5px;
    }

    &__btn {
      padding: 5px;
      color: $text-primary;
      background-color: inherit;
    }

    &__btn:focus,
    .selected {
      color: $primary-lightness;
      background-color: $text-primary;
    }
  }

  &__clear-completed {
    padding: 5px;
    color: $text-primary;
    background-color: inherit;

    &:focus {
      color: $primary-lightness;
      background-color: $text-primary;
    }
  }
}

@media (hover: hover) {
  .todo-nav-filters__btn:hover,
  .todo-nav__clear-completed:hover {
    color: $primary-lightness;
    background-color: $text-primary;
  }
}

@media screen and (max-width: $screen) {
  .todo-nav {
    flex-wrap: wrap;

    &__count {
      padding: 15px 5px;
      font-size: 20px;
    }

    &-filters {
      position: initial;
      display: flex;
      flex-wrap: wrap;
      order: 2;
      width: 100%;
      margin-top: 20px;

      li {
        display: flex;
        flex-grow: 1;
      }

      &__btn {
        flex-grow: 1;
        height: 50px;
      }
    }

    &__clear-completed {
      order: 1;
      height: 50px;
    }
  }
}
</style>
