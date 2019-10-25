<template>
  <div class="wrapper">
    <section class="inner">
      <div class="nav">
        <router-link to="/login" class="nav__login" active-class="active">
          Login
        </router-link>
        <router-link
          to="/registration"
          class="nav__registration"
          active-class="active"
        >
          Register
        </router-link>
      </div>
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  methods: {},
}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  min-height: 472px;
  box-shadow: 0 0 10px hsla(0, 0, 0, 0.5);
  background-color: $background;
  border-radius: 10px;

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
      color: $primary-lightness;
      background-color: $primary-light;
      font-size: 18px;
      font-weight: 400;
      transition: background-color 0.3s ease;
    }

    &__login:hover,
    &__registration:hover {
      background-color: $primary-light;
    }
  }
}

.active {
  color: $primary !important;
  background-color: $background !important;
  font-weight: 900 !important;
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
