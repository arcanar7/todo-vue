<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  font-family: 'Roboto', sans-serif;
}

a {
  text-decoration: none;
  outline: none;
}

button {
  width: 205px;
  font-size: 16px;
  font-weight: 900;
  color: $primary-lightness;
  background-color: $primary;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s linear;
}

input {
  padding-left: 10px;
  font-size: 14px;
  border: 1px solid $primary-light;
  background-color: $background-input;
}

button,
input {
  height: 40px;
  border-radius: 5px;
  outline: none !important;
}
</style>
