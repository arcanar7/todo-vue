<template>
  <div class="notification">
    <div class="notification__text">{{ $t('app-notify.text') }}</div>
    <button class="notification__refreshBtn" @click="onRefresh">
      {{ $t('app-notify.refresh') }}
    </button>
    <button class="notification__close" @click="onClose">&times;</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'AppNotify',
  methods: {
    ...mapMutations('Utils', ['setNotification']),

    onRefresh() {
      this.setNotification(false);
      window.location.reload();
    },
    onClose() {
      this.setNotification(false);
    },
  },
};
</script>

<style lang="scss">
.notification {
  position: absolute;
  bottom: 10px;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 10px 30px;
  color: $primary-lightness;
  background-color: $text;
  border-radius: 5px;
  box-shadow: 0 0 10px hsla(0, 0, 0, 0.35);
  opacity: 0.8;

  &__text {
    user-select: none;
  }

  &__refreshBtn {
    padding: 10px;
    margin: 0 40px;
    text-transform: uppercase;
    background-color: inherit;
  }

  &__close {
    font-size: 30px;
    background-color: inherit;
  }
}
</style>
