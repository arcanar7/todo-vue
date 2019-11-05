<template>
  <div class="not-found-wrapper">
    <header class="not-found-header">
      <h1 class="not-found-header__title">My ToDo List</h1>
    </header>
    <main class="not-found-main">
      <h2 class="not-found-main__title">(404 error) Page not found!</h2>
    </main>
    <nav class="not-found-nav">
      <router-link to="/" class="not-found-nav__home">
        Go to homepage
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.not-found-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.not-found-header {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 600px;

  &__title {
    color: $primary;
    text-align: center;
    font-weight: 900;
  }
}

.not-found-main {
  margin-top: 20px;

  &__title {
    color: $primary;
    text-align: center;
    font-weight: 900;
  }
}

.not-found-nav {
  margin-top: 20px;

  &__home {
    padding: 10px;
    border-radius: 5px;
    color: $primary-lightness;
    background-color: $primary;
    box-shadow: 4px 4px 4px hsla(0, 0, 0, 0.5);

    &:hover,
    &:focus {
      text-decoration: none;
    }

    &:active {
      color: $primary-lightness;
      box-shadow: 2px 2px 2px hsla(0, 0, 0, 0.5);
    }
  }
}
</style>
