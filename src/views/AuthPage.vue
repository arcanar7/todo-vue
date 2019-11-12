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
        <router-link
          to="/registration"
          class="nav__registration"
          active-class="active"
        >
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
const LanguageSelect = () =>
  import(
    /* webpackChunkName: "LanguageSelect.component" */ '@/components/LanguageSelect'
  )

export default {
  name: 'AuthPage',
  components: {
    LanguageSelect,
  },
}
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
    color: $primary;
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
      font-weight: 400;
      color: $primary-lightness;
      background-color: $primary-light;
      transition: background-color 0.3s ease;
    }

    &__login:hover,
    &__registration:hover {
      background-color: $primary-light;
    }
  }
}

.active {
  font-weight: 900 !important;
  color: $primary !important;
  background-color: $background !important;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
