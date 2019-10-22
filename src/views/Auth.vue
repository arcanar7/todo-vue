<template>
  <div class="wrapper">
    <section class="inner">
      <div class="nav">
        <router-link to="/login" class="nav__login" active-class="active">
          Sign In
        </router-link>
        <router-link
          to="/registration"
          class="nav__registration"
          active-class="active"
        >
          Sign Up
        </router-link>
      </div>
      <router-view />
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
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  box-shadow: 0 0 10px hsla(0, 0, 0, 0.5);
  background-color: $primary-lightness;

  .nav {
    display: flex;

    &__login,
    &__registration {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 50px;
      color: $primary-lightness;
      background-color: $primary;
      font-size: 18px;
      font-weight: 900;
      transition: background-color 0.3s linear;
    }

    &__login:hover,
    &__registration:hover {
      background-color: $primary-light;
    }
  }
}

.active {
  color: $primary !important;
  background-color: $primary-lightness !important;
}
</style>
