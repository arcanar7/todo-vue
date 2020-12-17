<template>
  <div class="wrapper">
    <header class="header">
      <language-select />
      <h1 class="title">{{ $t('title') }}</h1>
    </header>
    <section class="inner">
      <div class="nav">
        <router-link to="/login" class="nav__login" active-class="active">
          {{ $t('auth.login') }}
        </router-link>
        <router-link to="/registration" class="nav__registration" active-class="active">
          {{ $t('auth.registration') }}
        </router-link>
      </div>
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </section>
  </div>
</template>

<script>
import LanguageSelect from '@/components/LanguageSelect.vue';

export default {
  name: 'AuthPage',
  components: {
    LanguageSelect,
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 20px;

  .title {
    font-weight: 900;
    color: $text-primary;
    text-align: center;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  min-height: 472px;
  background-color: $background;
  border-radius: 10px;
  box-shadow: 0 0 10px hsla(0, 0, 0, 0.5);

  .nav {
    display: flex;

    &__login {
      border-radius: 10px 0 0 0;
    }

    &__registration {
      border-radius: 0 10px 0 0;
    }

    &__login,
    &__registration {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 50px;
      font-size: 18px;
      font-weight: 700;
      color: $text;
      background-color: $primary-light;
      transition: 0.3s background-color ease;
    }
  }
}

@media (hover: hover) {
  .nav__login:hover,
  .nav__registration:hover {
    background-color: $primary-lightest;
  }
}

.active {
  font-weight: 400 !important;
  color: $text-primary !important;
  background-color: $background !important;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: 0.3s opacity ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
