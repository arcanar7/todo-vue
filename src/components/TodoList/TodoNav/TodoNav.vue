<template>
  <nav class="todo-nav">
    <span class="todo-nav__count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
    <ul class="todo-nav-filters">
      <li>
        <button
          class="todo-nav-filters__btn"
          :class="{ selected: visibility == 'all' }"
          @click="onChangeVisibility('all')"
        >
          All
        </button>
      </li>
      <li>
        <button
          class="todo-nav-filters__btn"
          :class="{ selected: visibility == 'active' }"
          @click="onChangeVisibility('active')"
        >
          Active
        </button>
      </li>
      <li>
        <button
          class="todo-nav-filters__btn"
          :class="{ selected: visibility == 'completed' }"
          @click="onChangeVisibility('completed')"
        >
          Completed
        </button>
      </li>
    </ul>
    <button
      class="todo-nav__clear-completed"
      @click="removeCompleted"
      v-show="todos.length > remaining"
    >
      Clear completed
    </button>
  </nav>
</template>

<script>
import { filters } from '@/mixins/filter.mixin'

export default {
  mixins: [filters],
  props: { todos: Array },
  methods: {
    removeCompleted() {
      filters.completed(this.todos).map(item => {
        this.$store.dispatch('removeTodo', item.id)
      })
    },
    onChangeVisibility(visibility) {
      this.$store.dispatch('setVisibility', visibility)
    },
  },
  computed: {
    remaining() {
      return filters.active(this.todos).length
    },
    visibility() {
      return this.$store.getters.visibility
    },
  },
  filters: {
    pluralize(n) {
      return n === 1 ? 'item' : 'items'
    },
  },
}
</script>

<style lang="scss">
.todo-nav {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-grow: 1;
  position: relative;
  padding-left: 10px;

  &__count {
    padding: 5px;
    color: $primary;
  }

  &-filters {
    display: flex;
    position: absolute;
    left: 35%;
    list-style: none;
    margin: 0;
    padding: 0;

    li + li {
      margin-left: 5px;
    }

    &__btn {
      background-color: inherit;
      color: $primary;
      padding: 5px;
    }

    &__btn:hover,
    &__btn:focus,
    .selected {
      background-color: $primary-light;
      color: $primary-lightness;
    }
  }

  &__clear-completed {
    background-color: inherit;
    color: $primary;
    padding: 5px;

    &:hover,
    &:focus {
      background-color: $primary-light;
      color: $primary-lightness;
    }
  }
}

.completed {
  color: $primary-lightest;
  text-decoration: line-through;
}
</style>
