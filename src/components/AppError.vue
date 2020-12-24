<template>
  <div class="errors">
    <div class="errors__text">{{ error }}</div>
    <button class="errors__close" @click="onClose">&times;</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppError',
  mounted() {
    setTimeout(() => {
      this.onClose();
    }, 4000);
  },
  computed: {
    ...mapState('Utils', ['error']),
  },
  methods: {
    ...mapMutations('Utils', ['setError']),

    onClose() {
      this.setError(null);
    },
  },
};
</script>

<style lang="scss">
.errors {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 20px;
  margin: 0 10px;
  color: $error;
  text-align: center;
  background-color: $error-lightness;
  border-radius: 5px;
  box-shadow: 0 0 10px hsla(0, 0, 0, 0.35);
  opacity: 0.8;

  &__text {
    user-select: none;
  }

  &__close {
    font-size: 30px;
    color: $error;
    background-color: inherit;

    &:hover {
      background-color: $error-light;
    }
  }
}
</style>
