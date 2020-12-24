<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <app-error v-if="error" />
    </transition>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppError from '@/components/AppError.vue';

export default {
  components: { AppError },
  computed: {
    ...mapState('Utils', ['error']),
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s opacity;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
