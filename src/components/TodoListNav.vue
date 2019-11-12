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
    >
      {{ $t('todo-nav.clear') }}
    </button>
  </nav>
</template>

<script>
import { filters } from '@/mixins/filter.mixin'

export default {
  name: 'TodoListNav',
  mixins: [filters],
  props: { todos: { type: Array, required: true } },
  computed: {
    remaining() {
      return filters.active(this.todos).length
    },
    visibility() {
      return this.$store.getters.visibility
    },
  },
  methods: {
    removeCompleted() {
      filters.completed(this.todos).map(item => {
        this.$store.dispatch('removeTodo', item.id).catch(() => {})
      })
    },
    onChangeVisibility(visibility) {
      this.$store.dispatch('setVisibility', visibility)
    },
  },
}
</script>

<style lang="scss">
.todo-nav {
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: baseline;
  justify-content: space-between;
  padding-left: 10px;

  &__count {
    padding: 5px;
    color: $primary;
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
      color: $primary;
      background-color: inherit;
    }

    &__btn:hover,
    &__btn:focus,
    .selected {
      color: $primary-lightness;
      background-color: $primary-light;
    }
  }

  &__clear-completed {
    padding: 5px;
    color: $primary;
    background-color: inherit;

    &:hover,
    &:focus {
      color: $primary-lightness;
      background-color: $primary-light;
    }
  }
}

@media screen and (max-width: $screen) {
  .todo-nav {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-filters {
      position: initial;
    }
  }
}
</style>